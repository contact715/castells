/**
 * Shared delivery for form-generated leads: Telegram + email (Resend).
 * Each channel is best-effort and never throws — a missing key or a failed
 * send just returns false, so the caller can try the other channel and
 * decide honestly whether the lead actually reached anyone.
 */
import { sendMessage } from './telegram-api.js';

export async function notifyTelegram(text) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return false;
  try {
    await sendMessage(text);
    return true;
  } catch (error) {
    console.error('Telegram lead notification failed:', error);
    return false;
  }
}

export async function notifyEmail({ subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Castells Media <onboarding@resend.dev>',
        to: ['contact@castells.media'],
        subject,
        html,
      }),
    });
    if (!response.ok) {
      console.error('Resend API error:', await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Email lead notification failed:', error);
    return false;
  }
}

export function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
