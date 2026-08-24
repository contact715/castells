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

  /*
   * Почтовый ключ в проде не задан, и обработчик отвечал 500 на каждую заявку.
   * Найдено аудитом 24 августа.
   *
   * Первая попытка лечения была неверной: я направил заявку в formsubmit, тот
   * же сервис, что и у формы контактов. Проверка показала, что он отказывает
   * запросам, пришедшим не из браузера («Make sure you open this page through
   * a web server»), и вдобавок требует одноразовой активации по письму. То
   * есть с сервера этот путь не заработает никогда.
   *
   * Поэтому здесь честно: пока ключа нет, заявку принять нечем. Человеку
   * возвращается понятное сообщение с рабочим каналом вместо технической
   * ошибки, и это единственное, что можно сделать без действия владельца.
   */
  const apiKey = process.env.RESEND_API_KEY;

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

    if (!apiKey) {
      // Заявку видно хотя бы в логах Vercel, пока канал не настроен
      console.error('LEAD RECEIVED BUT NOT DELIVERED (no RESEND_API_KEY):', JSON.stringify({
        firstName, companyName, phone, cityState, serviceInterest, at: new Date().toISOString(),
      }));
      return res.status(503).json({
        error: 'We could not submit the form right now. Please text us on WhatsApp at +1 (916) 619-6006 or call — we answer there fastest.',
        whatsapp: 'https://wa.me/19166196006',
        phone: '+19166196006',
      });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        /*
         * onboarding@resend.dev это общий тестовый адрес сервиса: письма с
         * него доходят только на почту владельца аккаунта. То есть даже после
         * появления ключа доставка могла не заработать. Отправитель берётся из
         * переменной, чтобы подставить свой домен после его подтверждения.
         */
        from: process.env.RESEND_FROM || 'Castells Media <onboarding@resend.dev>',
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
