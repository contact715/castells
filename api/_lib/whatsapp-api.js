/**
 * WhatsApp Cloud API client.
 *
 * Env vars: WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID
 */

const API_VERSION = "v21.0";
const BASE_URL = "https://graph.facebook.com";

const TOKEN = () => process.env.WHATSAPP_API_TOKEN;
const PHONE_ID = () => process.env.WHATSAPP_PHONE_NUMBER_ID;

async function callApi(endpoint, body) {
  const url = `${BASE_URL}/${API_VERSION}/${PHONE_ID()}/${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WhatsApp API ${res.status}: ${text}`);
  }

  return res.json();
}

/**
 * Send a text message to a WhatsApp number.
 * @param {string} to - Phone number in international format (e.g. "972501234567")
 * @param {string} text - Message text
 */
export async function sendTextMessage(to, text) {
  return callApi("messages", {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  });
}

/**
 * Mark a message as read (blue checkmarks).
 * @param {string} messageId - WhatsApp message ID
 */
export async function markAsRead(messageId) {
  return callApi("messages", {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
}
