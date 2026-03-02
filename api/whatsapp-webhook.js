/**
 * Vercel serverless function — WhatsApp Cloud API webhook.
 *
 * GET:  Meta webhook verification (hub.challenge)
 * POST: Process incoming WhatsApp messages:
 *       - Parse message
 *       - Mark as read
 *       - Save to Redis
 *       - Analyze with AI
 *       - Notify owner in Telegram (training mode) or auto-reply (active mode)
 *
 * Env vars: WHATSAPP_VERIFY_TOKEN, WHATSAPP_APP_SECRET
 */

import { sendTextMessage, markAsRead } from "./_lib/whatsapp-api.js";
import { sendMessageWithButtons, sendMessage as sendTelegram } from "./_lib/telegram-api.js";
import { getConversation, saveConversation, getPatterns, getBotMode } from "./_lib/store.js";
import { analyzeMessage, generateReply } from "./_lib/ai-engine.js";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "mosco-wa-verify-2026";
const APP_SECRET = process.env.WHATSAPP_APP_SECRET || "";

// Disable Vercel's automatic body parsing so we get the raw body for signature validation
// maxDuration: 10s on Hobby (max allowed)
export const config = {
  api: { bodyParser: false },
  maxDuration: 10,
};

/**
 * Read the raw request body as a string.
 */
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  // --- GET: Webhook verification ---
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified");
      return res.status(200).send(challenge);
    }
    return res.status(403).send("Forbidden");
  }

  // --- POST: Incoming webhook event ---
  if (req.method === "POST") {
    // Read raw body for signature validation
    const rawBody = await getRawBody(req);
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      console.warn("Invalid JSON body");
      return res.status(400).send("Bad Request");
    }

    // Validate signature
    if (APP_SECRET) {
      const { createHmac } = await import("crypto");
      const signature = req.headers["x-hub-signature-256"];
      if (!signature) {
        console.warn("Missing X-Hub-Signature-256");
        return res.status(401).send("Unauthorized");
      }

      const expectedSig =
        "sha256=" +
        createHmac("sha256", APP_SECRET)
          .update(rawBody, "utf-8")
          .digest("hex");

      if (signature !== expectedSig) {
        console.warn("Invalid signature");
        return res.status(401).send("Invalid signature");
      }
    }

    // Process webhook first, then respond (Vercel may freeze after res.send)
    try {
      await processWebhook(body);
    } catch (err) {
      console.error("Webhook processing error:", err);
    }

    return res.status(200).json({ status: "received" });
  }

  return res.status(405).send("Method not allowed");
}

/**
 * Process the incoming WhatsApp webhook payload.
 */
async function processWebhook(body) {
  // Navigate the webhook structure
  const entry = body?.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;

  if (!value || !value.messages || value.messages.length === 0) {
    return; // Status update or no messages — ignore
  }

  const message = value.messages[0];
  const contact = value.contacts?.[0];
  const phone = message.from; // e.g. "972501234567"
  const senderName = contact?.profile?.name || "Unknown";
  const messageId = message.id;

  // Extract text from various message types
  const text = extractText(message);
  if (!text) {
    console.log(`Unsupported message type: ${message.type}`);
    // Notify owner about non-text message
    await sendTelegram(
      `[${phone}] ${senderName}\n\n[${message.type} message — not supported yet]`
    );
    return;
  }

  console.log(`Message from ${senderName} (+${phone}): ${text.substring(0, 100)}`);

  // Mark as read
  try {
    await markAsRead(messageId);
  } catch (err) {
    console.error("Mark as read error:", err);
  }

  // Load conversation from Redis
  const conv = (await getConversation(phone)) || {
    messages: [],
    name: senderName,
  };
  conv.name = senderName;
  conv.lastActive = Date.now();

  // Add new message to history
  conv.messages.push({
    role: "client",
    text,
    timestamp: Date.now(),
  });

  // Save updated conversation
  await saveConversation(phone, conv);

  // Load learned patterns
  const patterns = await getPatterns();

  // Check bot mode
  const mode = await getBotMode(phone);

  if (mode === "active") {
    await handleActiveMode(phone, senderName, text, conv, patterns);
  } else {
    await handleTrainingMode(phone, senderName, text, conv, patterns);
  }
}

/**
 * Training mode: analyze + notify owner in Telegram with suggested reply.
 */
async function handleTrainingMode(phone, senderName, text, conv, patterns) {
  // Analyze message with AI
  let analysis;
  try {
    analysis = await analyzeMessage({
      text,
      senderName,
      context: conv.messages.slice(-10),
      patterns,
    });
  } catch (err) {
    console.error("AI analysis error:", err);
    // Still notify owner even if AI fails
    await sendTelegram(`[${phone}] ${senderName}\n\n${text}`);
    return;
  }

  // Build Telegram notification
  const urgencyEmoji =
    analysis.urgency === "high" ? "!!!" :
    analysis.urgency === "medium" ? "!" : "";

  const notification =
    `[${phone}] ${senderName} ${urgencyEmoji}\n\n` +
    `${text}\n\n` +
    `Summary: ${analysis.summary}\n` +
    `Category: ${analysis.category}\n\n` +
    `Suggested reply:\n${analysis.suggested_reply}`;

  // Send with "Approve" button
  const buttons = [
    [{ text: "Send suggested reply", callback_data: `approve:${phone}` }],
  ];

  try {
    await sendMessageWithButtons(notification, buttons);
  } catch (err) {
    // Fallback without buttons
    console.error("Button send error, falling back:", err);
    await sendTelegram(notification);
  }
}

/**
 * Active mode: auto-reply + notify owner.
 */
async function handleActiveMode(phone, senderName, text, conv, patterns) {
  let replyText;
  try {
    replyText = await generateReply({
      text,
      senderName,
      context: conv.messages.slice(-10),
      patterns,
    });
  } catch (err) {
    console.error("AI reply generation error:", err);
    // Fall back to training mode
    await handleTrainingMode(phone, senderName, text, conv, patterns);
    return;
  }

  // Send auto-reply to WhatsApp
  try {
    await sendTextMessage(phone, replyText);

    // Update conversation with the auto-reply
    conv.messages.push({
      role: "agency",
      text: replyText,
      timestamp: Date.now(),
    });
    await saveConversation(phone, conv);

    // Notify owner
    await sendTelegram(
      `[${phone}] ${senderName}\n\n` +
        `Client: ${text}\n\n` +
        `Auto-replied: ${replyText}`
    );
  } catch (err) {
    console.error("Auto-reply error:", err);
    await sendTelegram(
      `[${phone}] ${senderName}\n\nFailed to auto-reply: ${err.message}\n\nClient msg: ${text}`
    );
  }
}

/**
 * Extract text content from various WhatsApp message types.
 */
function extractText(message) {
  switch (message.type) {
    case "text":
      return message.text?.body || null;
    case "image":
      return message.image?.caption || "[Image]";
    case "video":
      return message.video?.caption || "[Video]";
    case "document":
      return message.document?.caption || `[Document: ${message.document?.filename || "file"}]`;
    case "audio":
    case "voice":
      return "[Voice message]";
    case "location":
      return `[Location: ${message.location?.latitude}, ${message.location?.longitude}]`;
    case "contacts":
      return `[Contact shared]`;
    case "sticker":
      return "[Sticker]";
    default:
      return null;
  }
}
