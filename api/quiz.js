/**
 * Vercel Serverless Function: POST /api/quiz
 * Delivers the growth-audit quiz to Telegram and email (Resend).
 * Same delivery mechanism as /api/contact — see api/contact.js for why the
 * earlier formsubmit.co path was replaced.
 */
import { notifyTelegram, notifyEmail, esc } from './_lib/notify-lead.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, website, goal, budget, industry } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

  const telegramText =
    `📋 New growth audit request\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (website ? `Website: ${website}\n` : '') +
    (goal ? `Goal: ${goal}\n` : '') +
    (budget ? `Budget: ${budget}\n` : '') +
    (industry ? `Industry: ${industry}\n` : '') +
    `\nSubmitted ${submittedAt} CT`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New growth audit request</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${website ? `<p><strong>Website:</strong> ${esc(website)}</p>` : ''}
      ${goal ? `<p><strong>Goal:</strong> ${esc(goal)}</p>` : ''}
      ${budget ? `<p><strong>Budget:</strong> ${esc(budget)}</p>` : ''}
      ${industry ? `<p><strong>Industry:</strong> ${esc(industry)}</p>` : ''}
      <div style="margin-top: 20px; padding: 12px; background: #F0F2F5; border-radius: 6px; font-size: 13px; color: #65676B;">
        Submitted at ${submittedAt} CT
      </div>
    </div>
  `;

  const [telegramOk, emailOk] = await Promise.all([
    notifyTelegram(telegramText),
    notifyEmail({ subject: `New growth audit request: ${name}`, html: emailHtml }),
  ]);

  if (!telegramOk && !emailOk) {
    console.error('QUIZ LEAD RECEIVED BUT NOT DELIVERED:', JSON.stringify({
      name, email, website, goal, budget, industry, at: new Date().toISOString(),
    }));
    return res.status(503).json({
      error: 'We could not submit the form right now. Please text us on WhatsApp at +1 (916) 619-6006 or call — we answer there fastest.',
      whatsapp: 'https://wa.me/19166196006',
      phone: '+19166196006',
    });
  }

  return res.status(200).json({ success: true, message: 'Thank you! We will send your growth roadmap soon.' });
}
