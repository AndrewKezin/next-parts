import { Resend } from 'resend';

const resend = new Resend('re_fG73X5Cc_oKANWDmdy5cyUM4YwWgGXqjp');
// const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
