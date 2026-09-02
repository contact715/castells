/**
 * Vercel Serverless Function: POST /api/contact
 * Delivers the contact-page form to Telegram and email (Resend).
 *
 * Replaces the earlier formsubmit.co dependency. That service left new
 * submissions stuck behind a one-time "Activate Form" email click, and on
 * every failure it leaked its own raw status text to the site visitor
 * instead of a normal error message. Found and verified live 2 September
 * 2026 by submitting a real test lead through the production form.
 */
import { notifyTelegram, notifyEmail, esc } from './_lib/notify-lead.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, topic, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

  const telegramText =
    `📬 New contact form submission\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (phone ? `Phone: ${phone}\n` : '') +
    `Topic: ${topic || 'not specified'}\n\n` +
    `${message}\n\n` +
    `Submitted ${submittedAt} CT`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ''}
      <p><strong>Topic:</strong> ${esc(topic || 'not specified')}</p>
      <p><strong>Message:</strong></p>
      <p>${esc(message).replace(/\n/g, '<br>')}</p>
      <div style="margin-top: 20px; padding: 12px; background: #F0F2F5; border-radius: 6px; font-size: 13px; color: #65676B;">
        Submitted at ${submittedAt} CT
      </div>
    </div>
  `;

  const [telegramOk, emailOk] = await Promise.all([
    notifyTelegram(telegramText),
    notifyEmail({
      subject: `New contact form: ${name}${topic ? ` — ${topic}` : ''}`,
      html: emailHtml,
    }),
  ]);

  if (!telegramOk && !emailOk) {
    // Ни один канал не настроен или не сработал — заявку видно хотя бы в
    // логах Vercel, а человеку показывается рабочий канал вместо ошибки.
    console.error('CONTACT LEAD RECEIVED BUT NOT DELIVERED:', JSON.stringify({
      name, email, phone, topic, message, at: new Date().toISOString(),
    }));
    return res.status(503).json({
      error: 'We could not submit the form right now. Please text us on WhatsApp at +1 (916) 619-6006 or call — we answer there fastest.',
      whatsapp: 'https://wa.me/19166196006',
      phone: '+19166196006',
    });
  }

  return res.status(200).json({ success: true, message: 'Thank you! We will get back to you soon.' });
}
