/**
 * Отправка форм сайта.
 *
 * История. До 23 августа 2026 формы шли на /api/contact и /api/quiz, а
 * обработчиков не существовало — прод отвечал 404. Починка 23-24 августа
 * переключила обе формы на formsubmit.co (сторонний пересыльщик почты).
 *
 * 2 сентября 2026 обнаружено на боевой отправке: formsubmit.co требовал
 * одноразовой активации по ссылке в письме, и до её нажатия ни одна заявка
 * не доходила — а посетитель вместо «спасибо» видел сырой английский текст
 * ошибки от чужого сервиса прямо на странице. Заодно здесь же читался
 * VITE_RESEND_API_KEY — это публичная переменная сборки Vite, она
 * встраивается в JS-бандл браузера как есть, то есть ключ Resend оказался
 * бы виден в devtools любому посетителю сайта. Ключ ни разу не был задан,
 * поэтому утечки не случилось, но путь был опасен сам по себе.
 *
 * Теперь оба пути закрыты. Обе формы шлют JSON на свои серверные
 * обработчики (/api/contact, /api/quiz — см. api/contact.js, api/quiz.js),
 * которые сами доставляют заявку в Telegram и на почту через Resend.
 * Секретные ключи живут только на сервере.
 */

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

const submitToEndpoint = async (
  endpoint: string,
  data: Record<string, unknown>
): Promise<FormSubmissionResult> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: result?.error || `Could not send the message (${response.status}). Please write to us on WhatsApp.`,
      };
    }

    return { success: true, message: result?.message || 'Sent' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Could not send the message. Please write to us on WhatsApp.',
    };
  }
};

/** Submit contact form */
export const submitContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}): Promise<FormSubmissionResult> => submitToEndpoint('/api/contact', data);

/** Submit quiz/growth audit form */
export const submitQuizForm = async (data: {
  name: string;
  email: string;
  website?: string;
  goal?: string;
  budget?: string;
  industry?: string;
}): Promise<FormSubmissionResult> => submitToEndpoint('/api/quiz', data);
