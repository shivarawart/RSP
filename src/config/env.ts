const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const env = {
  emailjs: {
    serviceId,
    templateId,
    publicKey,
  },
} as const;

export function validateEnv() {
  const missing: string[] = [];

  if (!env.emailjs.serviceId) {
    missing.push("VITE_EMAILJS_SERVICE_ID");
  }

  if (!env.emailjs.templateId) {
    missing.push("VITE_EMAILJS_TEMPLATE_ID");
  }

  if (!env.emailjs.publicKey) {
    missing.push("VITE_EMAILJS_PUBLIC_KEY");
  }

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}
