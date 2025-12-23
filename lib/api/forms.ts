/**
 * Form submission API utilities
 * Supports multiple form submission services
 */

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit contact form
 * Uses Resend API (or can be configured for other services)
 */
export const submitContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}): Promise<FormSubmissionResult> => {
  try {
    // Option 1: Use Resend API (recommended)
    // You need to set VITE_RESEND_API_KEY in .env
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
    
    if (resendApiKey) {
      return await submitViaResend(data, resendApiKey);
    }

    // Option 2: Use custom API endpoint
    const apiEndpoint = import.meta.env.VITE_FORM_API_ENDPOINT || '/api/contact';
    
    if (apiEndpoint.startsWith('http') || apiEndpoint.startsWith('/api')) {
      return await submitViaAPI(data, apiEndpoint);
    }

    // Option 3: Fallback - log to console (for development)
    console.log('Form submission (development mode):', data);
    return {
      success: true,
      message: 'Form submitted successfully (development mode)',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
};

/**
 * Submit via Resend API
 */
const submitViaResend = async (
  data: {
    name: string;
    email: string;
    phone?: string;
    topic: string;
    message: string;
  },
  apiKey: string
): Promise<FormSubmissionResult> => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Castells Agency <noreply@castells.agency>',
        to: ['hello@castells.agency'], // Your email
        reply_to: data.email,
        subject: `New Contact Form Submission: ${data.topic}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Topic:</strong> ${data.topic}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    return {
      success: true,
      message: 'Thank you! We will get back to you soon.',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};

/**
 * Submit via custom API endpoint
 */
const submitViaAPI = async (
  data: {
    name: string;
    email: string;
    phone?: string;
    topic: string;
    message: string;
  },
  endpoint: string
): Promise<FormSubmissionResult> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Form submitted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
};

/**
 * Submit quiz/growth audit form
 */
export const submitQuizForm = async (data: {
  name: string;
  email: string;
  website?: string;
  goal?: string;
  budget?: string;
  industry?: string;
}): Promise<FormSubmissionResult> => {
  try {
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
    
    if (resendApiKey) {
      return await submitQuizViaResend(data, resendApiKey);
    }

    const apiEndpoint = import.meta.env.VITE_FORM_API_ENDPOINT || '/api/quiz';
    
    if (apiEndpoint.startsWith('http') || apiEndpoint.startsWith('/api')) {
      return await submitViaAPI(data as any, apiEndpoint);
    }

    console.log('Quiz form submission (development mode):', data);
    return {
      success: true,
      message: 'Form submitted successfully (development mode)',
    };
  } catch (error) {
    console.error('Quiz form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
};

/**
 * Submit quiz via Resend
 */
const submitQuizViaResend = async (
  data: {
    name: string;
    email: string;
    website?: string;
    goal?: string;
    budget?: string;
    industry?: string;
  },
  apiKey: string
): Promise<FormSubmissionResult> => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Castells Agency <noreply@castells.agency>',
        to: ['hello@castells.agency'],
        reply_to: data.email,
        subject: 'New Growth Audit Request',
        html: `
          <h2>New Growth Audit Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
          ${data.goal ? `<p><strong>Goal:</strong> ${data.goal}</p>` : ''}
          ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
          ${data.industry ? `<p><strong>Industry:</strong> ${data.industry}</p>` : ''}
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    return {
      success: true,
      message: 'Thank you! We will send your growth roadmap soon.',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};

