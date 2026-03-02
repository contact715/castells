/**
 * Vercel serverless function — Telegram Bot webhook.
 *
 * Handles:
 * - Owner replies → forwarded to WhatsApp client
 * - Commands: /status, /mode, /pause, /resume, /help
 * - Callback queries (approve suggested reply button)
 *
 * Env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

import { sendTextMessage } from "./_lib/whatsapp-api.js";
import { sendMessage } from "./_lib/telegram-api.js";
import {
  getConversation,
  saveConversation,
  recordInteraction,
  getPatterns,
  getStats,
  getBotMode,
  setBotMode,
  pausePhone,
  resumePhone,
  addPattern,
} from "./_lib/store.js";
import { extractPattern } from "./_lib/ai-engine.js";

const OWNER_CHAT_ID = () => process.env.TELEGRAM_CHAT_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  // Process before responding (Vercel may freeze after res.send)
  try {
    const update = req.body;

    // Handle callback queries (inline button presses)
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
      return res.status(200).json({ ok: true });
    }

    const message = update.message;
    if (!message) return res.status(200).json({ ok: true });

    // Only process messages from the owner
    const chatId = String(message.chat.id);
    if (chatId !== OWNER_CHAT_ID()) {
      console.log(`Ignoring message from unauthorized chat: ${chatId}`);
      return res.status(200).json({ ok: true });
    }

    const text = message.text || "";

    // Handle commands
    if (text.startsWith("/")) {
      await handleCommand(text.trim());
      return res.status(200).json({ ok: true });
    }

    // Handle reply to a forwarded message
    if (message.reply_to_message) {
      await handleReply(message);
      return res.status(200).json({ ok: true });
    }

    // Handle direct message in format: phone message
    const directMatch = text.match(/^(\+?\d{10,15})\s+(.+)/s);
    if (directMatch) {
      const phone = directMatch[1].replace(/^\+/, "");
      const replyText = directMatch[2].trim();
      await sendToWhatsApp(phone, replyText, null);
      return res.status(200).json({ ok: true });
    }

    await sendMessage("Unknown format. Reply to a notification or use: PHONE MESSAGE\n\nCommands: /help");
  } catch (err) {
    console.error("Telegram webhook error:", err);
  }

  return res.status(200).json({ ok: true });
}

/**
 * Handle reply to a forwarded WhatsApp notification.
 */
async function handleReply(message) {
  const originalText = message.reply_to_message.text || "";
  const replyText = message.text || "";

  // Extract phone number from [phone] pattern in original message
  const phoneMatch = originalText.match(/\[(\+?\d{10,15})\]/);
  if (!phoneMatch) {
    await sendMessage("Could not find phone number in the original message. Use: PHONE MESSAGE");
    return;
  }

  const phone = phoneMatch[1].replace(/^\+/, "");

  // Extract the suggested reply from the original message (after the marker)
  const suggestedMatch = originalText.match(/Suggested reply:\n(.+?)(?:\n\n|$)/s);
  const suggestedReply = suggestedMatch ? suggestedMatch[1].trim() : null;

  await sendToWhatsApp(phone, replyText, suggestedReply);
}

/**
 * Handle callback queries from inline buttons.
 */
async function handleCallbackQuery(query) {
  const data = query.data || "";

  // Handle "approve:PHONE" callback — send the suggested reply
  if (data.startsWith("approve:")) {
    const phone = data.slice("approve:".length);
    const originalText = query.message?.text || "";

    // Extract suggested reply
    const suggestedMatch = originalText.match(/Suggested reply:\n(.+?)(?:\n\n|$)/s);
    if (!suggestedMatch) {
      await sendMessage("Could not find suggested reply to approve.");
      return;
    }

    const suggestedReply = suggestedMatch[1].trim();
    await sendToWhatsApp(phone, suggestedReply, suggestedReply);

    // Answer callback to remove loading state
    await answerCallbackQuery(query.id, "Sent!");
  }
}

/**
 * Send a reply to WhatsApp and record the interaction for learning.
 */
async function sendToWhatsApp(phone, replyText, suggestedReply) {
  try {
    await sendTextMessage(phone, replyText);

    // Update conversation in Redis
    const conv = (await getConversation(phone)) || { messages: [], name: null };
    conv.messages.push({
      role: "agency",
      text: replyText,
      timestamp: Date.now(),
    });
    conv.lastActive = Date.now();
    await saveConversation(phone, conv);

    // Get the last client message for learning
    const lastClientMsg = [...conv.messages]
      .reverse()
      .find((m) => m.role === "client");

    // Record interaction and learn pattern if we have a suggested reply to compare
    if (suggestedReply && lastClientMsg) {
      await recordInteraction(phone, {
        clientMsg: lastClientMsg.text,
        suggestedReply,
        actualReply: replyText,
      });

      // Extract pattern if replies differ
      if (suggestedReply !== replyText) {
        try {
          const pattern = await extractPattern(
            lastClientMsg.text,
            suggestedReply,
            replyText
          );
          if (pattern) {
            await addPattern(pattern);
            await sendMessage(`Learned: ${pattern}`);
          }
        } catch (err) {
          console.error("Pattern extraction error:", err);
        }
      }
    }

    await sendMessage(`Sent to +${phone}`);
  } catch (err) {
    console.error("WhatsApp send error:", err);
    await sendMessage(`Failed to send to +${phone}: ${err.message}`);
  }
}

/**
 * Handle bot commands.
 */
async function handleCommand(text) {
  const [cmd, ...args] = text.split(/\s+/);

  switch (cmd) {
    case "/status": {
      const stats = await getStats();
      const patterns = await getPatterns();
      const lastPatterns = patterns.slice(-3);
      let msg = `Mode: ${stats.mode}\nPatterns learned: ${stats.patternsCount}`;
      if (lastPatterns.length > 0) {
        msg += `\n\nRecent patterns:\n${lastPatterns.map((p, i) => `${i + 1}. ${p}`).join("\n")}`;
      }
      await sendMessage(msg);
      break;
    }

    case "/mode": {
      const newMode = args[0];
      if (!newMode || !["training", "active"].includes(newMode)) {
        const current = await getBotMode();
        await sendMessage(`Current mode: ${current}\n\nUsage: /mode training or /mode active`);
        return;
      }
      await setBotMode(newMode);
      await sendMessage(`Mode set to: ${newMode}`);
      break;
    }

    case "/pause": {
      const phone = args[0]?.replace(/^\+/, "");
      if (!phone) {
        await sendMessage("Usage: /pause PHONE_NUMBER");
        return;
      }
      await pausePhone(phone);
      await sendMessage(`Auto-replies paused for +${phone}`);
      break;
    }

    case "/resume": {
      const phone = args[0]?.replace(/^\+/, "");
      if (!phone) {
        await sendMessage("Usage: /resume PHONE_NUMBER");
        return;
      }
      await resumePhone(phone);
      await sendMessage(`Auto-replies resumed for +${phone}`);
      break;
    }

    case "/help": {
      await sendMessage(
        `Commands:\n` +
          `/status — Bot status and learned patterns\n` +
          `/mode training|active — Switch mode\n` +
          `/pause PHONE — Pause auto-replies for a number\n` +
          `/resume PHONE — Resume auto-replies\n` +
          `/help — This message\n\n` +
          `To reply: just reply to a notification message.\n` +
          `Or send: PHONE MESSAGE`
      );
      break;
    }

    default:
      await sendMessage(`Unknown command: ${cmd}. Try /help`);
  }
}

/**
 * Answer a Telegram callback query.
 */
async function answerCallbackQuery(callbackQueryId, text) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
}
