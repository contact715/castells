/**
 * OpenAI wrapper for message analysis, reply generation, and learning.
 *
 * Env vars: OPENAI_API_KEY
 */

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

async function chat(messages, jsonMode = false) {
  const body = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 1000,
  };
  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// --- Analyzer prompt (based on castells-automation/whatsapp_agent/prompts/analyzer.md) ---
const ANALYZER_SYSTEM = `You are a business assistant for Castells, a digital marketing agency.

Your job is to analyze incoming WhatsApp messages from potential clients and suggest appropriate replies.

## Context

Castells manages digital advertising campaigns (Google Ads, Meta Ads) for small businesses — HVAC companies, kitchen remodeling, auto tinting, painting, and similar home services.

New leads come via WhatsApp asking about marketing services. The agency owner reviews all conversations.

## Your Tasks

1. **Summarize** what the person wants or is communicating
2. **Suggest a reply** that is professional, helpful, and moves toward scheduling a call
3. **Assess urgency** — is this time-sensitive?
4. **Categorize** the message (new_lead, question, follow_up, complaint, greeting, other)

## Guidelines

- Match the language of the incoming message (English, Spanish, Russian, Hebrew)
- Keep suggested replies concise and professional — 1-3 sentences
- For new leads: be welcoming, ask about their business, suggest a quick call
- For questions about pricing: don't give exact numbers, offer to discuss on a call
- Never say you are an AI or bot. You represent the agency.
- If patterns from previous interactions are provided, follow them closely

## Response Format

Always respond with valid JSON:
{
  "summary": "Brief summary of the message",
  "suggested_reply": "Your suggested reply text",
  "urgency": "low|medium|high",
  "category": "new_lead|question|follow_up|complaint|greeting|other"
}`;

// --- Responder prompt (based on castells-automation/whatsapp_agent/prompts/responder.md) ---
const RESPONDER_SYSTEM = `You are a professional auto-responder for Castells, a digital marketing agency.

You reply to clients on behalf of the agency owner via WhatsApp.

## Tone of Voice

- Be warm but professional. Soft and helpful, never pushy.
- No emojis. No bullet lists. No markdown formatting. Write plain text like a real person.
- Keep replies concise — 1-3 sentences unless the topic requires more detail.
- Match the language of the incoming message:
  - Russian → reply in Russian
  - English → reply in English
  - Spanish → reply in Spanish
  - Hebrew → reply in Hebrew

## What You Know

- Castells manages digital advertising campaigns (Google Ads, Meta Ads) for small businesses.
- Clients include HVAC companies, kitchen remodeling, auto tinting, painting, and similar services.
- The agency owner reviews all conversations, so be accurate — don't make promises.

## Rules

1. If the client asks about specific numbers, budgets, or pricing — say you will discuss on a call. Do NOT invent numbers.
2. If the client is unhappy — acknowledge their concern and say the team will follow up.
3. If the message is a simple greeting — respond naturally and briefly.
4. If you're unsure what they're asking — ask a clarifying question politely.
5. Never say you are an AI, a bot, or an automated system.
6. Guide conversations toward scheduling a call when appropriate.

## Response Format

Return ONLY the reply text. No JSON, no labels, no prefix. Just the message to send.`;

/**
 * Analyze an incoming message and suggest a reply.
 * @param {{ text: string, senderName: string, context: object[], patterns: string[] }} params
 * @returns {Promise<{ summary: string, suggested_reply: string, urgency: string, category: string }>}
 */
export async function analyzeMessage({ text, senderName, context, patterns }) {
  const messages = [{ role: "system", content: ANALYZER_SYSTEM }];

  // Add learned patterns as context
  if (patterns && patterns.length > 0) {
    messages.push({
      role: "system",
      content: `## Learned patterns from owner's previous replies:\n${patterns.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nFollow these patterns when crafting your suggested reply.`,
    });
  }

  // Add conversation history as context
  if (context && context.length > 0) {
    const historyText = context
      .slice(-10) // last 10 messages
      .map((m) => `${m.role === "client" ? senderName || "Client" : "Agency"}: ${m.text}`)
      .join("\n");
    messages.push({
      role: "user",
      content: `## Conversation history:\n${historyText}\n\n## New message from ${senderName || "Client"}:\n${text}`,
    });
  } else {
    messages.push({
      role: "user",
      content: `New message from ${senderName || "Client"}:\n${text}`,
    });
  }

  const raw = await chat(messages, true);
  return JSON.parse(raw);
}

/**
 * Generate an auto-reply for active mode.
 * @param {{ text: string, senderName: string, context: object[], patterns: string[] }} params
 * @returns {Promise<string>} Reply text
 */
export async function generateReply({ text, senderName, context, patterns }) {
  const messages = [{ role: "system", content: RESPONDER_SYSTEM }];

  if (patterns && patterns.length > 0) {
    messages.push({
      role: "system",
      content: `## Learned patterns from owner's communication style:\n${patterns.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nMimic the owner's style closely.`,
    });
  }

  if (context && context.length > 0) {
    const historyText = context
      .slice(-10)
      .map((m) => `${m.role === "client" ? senderName || "Client" : "Agency"}: ${m.text}`)
      .join("\n");
    messages.push({
      role: "user",
      content: `Conversation history:\n${historyText}\n\nNew message from ${senderName || "Client"}:\n${text}\n\nReply:`,
    });
  } else {
    messages.push({
      role: "user",
      content: `Message from ${senderName || "Client"}:\n${text}\n\nReply:`,
    });
  }

  return chat(messages);
}

/**
 * Extract a pattern by comparing suggested reply vs owner's actual reply.
 * @param {string} clientMsg - The original client message
 * @param {string} suggestedReply - What AI suggested
 * @param {string} actualReply - What the owner actually sent
 * @returns {Promise<string|null>} Pattern description or null if replies are similar
 */
export async function extractPattern(clientMsg, suggestedReply, actualReply) {
  const messages = [
    {
      role: "system",
      content: `You analyze differences between AI-suggested replies and actual owner replies to extract communication style patterns.

Compare the suggested reply with what the owner actually sent. If they are substantially different, extract a concise pattern rule that captures the owner's preference.

Examples of patterns:
- "When clients ask about pricing, owner prefers to immediately suggest a call rather than discussing ranges"
- "Owner uses casual Russian ('ты' form) with existing clients, not formal 'вы'"
- "Owner always mentions specific services they can help with rather than generic offers"
- "Owner responds in English even when clients write in Russian"

If the replies are essentially the same (same meaning, similar tone), return exactly: NO_DIFFERENCE

Return ONLY the pattern description or NO_DIFFERENCE. Nothing else.`,
    },
    {
      role: "user",
      content: `Client message: ${clientMsg}\n\nAI suggested: ${suggestedReply}\n\nOwner actually replied: ${actualReply}`,
    },
  ];

  const result = await chat(messages);
  const trimmed = result.trim();
  if (trimmed === "NO_DIFFERENCE") return null;
  return trimmed;
}
