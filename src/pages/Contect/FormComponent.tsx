"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/* =========================================================
   EMAILJS CONFIG
========================================================= */

const EMAILJS_SERVICE_ID = "service_g17zf4m";
const EMAILJS_TEMPLATE_ID = "template_2mkiika";
const EMAILJS_PUBLIC_KEY = "poMUJ-1u5eb6MRdt0";

/* =========================================================
   TYPES
========================================================= */

type FormState = {
  user_name: string;
  user_email: string;
  user_phone: string;
  message: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

type EmailJsError = {
  status?: number;
  text?: string;
  message?: string;
};

const INITIAL_FORM_STATE: FormState = {
  user_name: "",
  user_email: "",
  user_phone: "",
  message: "",
};

/* =========================================================
   ICON
========================================================= */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* =========================================================
   FORM COMPONENT
========================================================= */

export default function FormComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = status === "sending";
  const submitted = status === "success";

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }

    if (status === "success") {
      setStatus("idle");
    }
  };

  /* =======================================================
     EMAILJS SUBMIT
  ======================================================= */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!formRef.current) {
      setStatus("error");
      setErrorMessage("The form is not ready. Please refresh and try again.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const templateParams = {
        user_name: form.user_name.trim(),
        user_email: form.user_email.trim(),
        user_phone: form.user_phone.trim(),
        message: form.message.trim(),
        submitted_at: new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      console.info(
        "EmailJS email sent successfully:",
        response.status,
        response.text,
      );

      setStatus("success");
      setForm(INITIAL_FORM_STATE);

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }

      successTimeoutRef.current = setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error: unknown) {
      console.error("EmailJS failed to send the form:", error);

      const emailJsError = error as EmailJsError;

      let message =
        "We could not send your enquiry right now. Please try again in a moment.";

      if (emailJsError.status === 400) {
        message =
          "The form details or EmailJS template variables are invalid. Please check the EmailJS template.";
      } else if (emailJsError.status === 401) {
        message =
          "Email authorization failed. Verify the EmailJS public key and allowed domain.";
      } else if (emailJsError.status === 404) {
        message =
          "EmailJS service or template was not found. Verify your service and template IDs.";
      } else if (emailJsError.status === 412) {
        message =
          "EmailJS service configuration is incomplete. Check the email service and template settings.";
      } else if (emailJsError.status === 429) {
        message =
          "Too many attempts were made. Please wait one minute before trying again.";
      } else if (emailJsError.text) {
        message = emailJsError.text;
      }

      setStatus("error");
      setErrorMessage(message);
    }
  };

  return (
    <div className="w-full">
      {/* SUCCESS MESSAGE */}
      {submitted && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 border border-green-200 bg-green-50 p-5 text-center"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckIcon />
          </div>

          <h3 className="mt-3 font-bold text-green-900">
            Message sent successfully.
          </h3>

          <p className="mt-1 text-sm text-green-700">
            Thank you. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 border border-red-200 bg-red-50 p-5"
        >
          <h3 className="font-bold text-red-900">Message could not be sent.</h3>

          <p className="mt-1 text-sm leading-6 text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* FORM */}
      <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
        {/* NAME AND EMAIL */}
        <div className="grid w-full gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label
              htmlFor="user_name"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
            >
              Full name
            </label>

            <input
              id="user_name"
              name="user_name"
              type="text"
              value={form.user_name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
              disabled={isSubmitting}
              className="h-14 w-full min-w-0 border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="user_email"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
            >
              Email
            </label>

            <input
              id="user_email"
              name="user_email"
              type="email"
              value={form.user_email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={150}
              required
              disabled={isSubmitting}
              className="h-14 w-full min-w-0 border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>

        {/* PHONE */}
        <div className="w-full">
          <label
            htmlFor="user_phone"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
          >
            Contact number
          </label>

          <input
            id="user_phone"
            name="user_phone"
            type="tel"
            value={form.user_phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            autoComplete="tel"
            inputMode="tel"
            minLength={7}
            maxLength={25}
            required
            disabled={isSubmitting}
            className="h-14 w-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* MESSAGE */}
        <div className="w-full">
          <label
            htmlFor="message"
            className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
          >
            Your message
          </label>

          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us about your current Japanese level, your goal, and what you need help with..."
            minLength={10}
            maxLength={3000}
            required
            disabled={isSubmitting}
            className="min-h-[160px] w-full resize-y border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex min-h-14 w-full items-center justify-center gap-3 bg-red-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>
            {isSubmitting ? "Sending your message..." : "Send enquiry"}
          </span>

          {!isSubmitting && (
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
