/**
 * Vercel Serverless Function: POST /api/lead-form
 * Receives lead form data and sends email via Resend API
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const { firstName, phone, cityState, serviceInterest, companyName } = req.body;

    if (!firstName || !phone || !serviceInterest) {
      return res.status(400).json({ error: 'Name, phone, and service are required' });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #515BD4, #DD2A7B, #F58529); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">🔥 New Auto Shop Lead</h2>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #e4e6eb; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #65676B; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1C1E21;">${esc(firstName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #65676B;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1C1E21;"><a href="tel:${esc(phone)}" style="color: #1877F2;">${esc(phone)}</a></td>
            </tr>
            ${companyName ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #65676B;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1C1E21;">${esc(companyName)}</td>
            </tr>` : ''}
            ${cityState ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #65676B;">Location</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1C1E21;">${esc(cityState)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #65676B;">Service</td>
              <td style="padding: 10px 0; color: #1C1E21;"><strong>${esc(serviceInterest)}</strong></td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 12px; background: #F0F2F5; border-radius: 6px; font-size: 13px; color: #65676B;">
            Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT
          </div>
        </div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Lead Form <onboarding@resend.dev>',
        to: ['contact@castells.media'],
        subject: `🔥 New Lead: ${firstName}${companyName ? ` (${companyName})` : ''} — ${serviceInterest}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Lead form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
