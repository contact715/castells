/**
 * Telegram Bot API client.
 *
 * Env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

const BASE_URL = "https://api.telegram.org";

const BOT_TOKEN = () => process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = () => process.env.TELEGRAM_CHAT_ID;

async function callApi(method, params) {
  const url = `${BASE_URL}/bot${BOT_TOKEN()}/${method}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Telegram API ${res.status}: ${text}`);
  }

  return res.json();
}

/**
 * Send a text message to the owner's Telegram chat.
 * @param {string} text - Message text
 * @param {string} [parseMode] - "HTML" or "Markdown" (optional)
 */
export async function sendMessage(text, parseMode) {
  const params = { chat_id: CHAT_ID(), text };
  if (parseMode) params.parse_mode = parseMode;
  return callApi("sendMessage", params);
}

/**
 * Send a message with inline keyboard buttons.
 * @param {string} text - Message text
 * @param {Array} buttons - Array of button rows, each row is array of {text, callback_data}
 * @param {string} [parseMode] - "HTML" or "Markdown"
 */
export async function sendMessageWithButtons(text, buttons, parseMode) {
  const params = {
    chat_id: CHAT_ID(),
    text,
    reply_markup: { inline_keyboard: buttons },
  };
  if (parseMode) params.parse_mode = parseMode;
  return callApi("sendMessage", params);
}

/**
 * Set webhook URL for the Telegram bot.
 * @param {string} url - Full HTTPS URL for the webhook
 */
export async function setWebhook(url) {
  return callApi("setWebhook", { url });
}
