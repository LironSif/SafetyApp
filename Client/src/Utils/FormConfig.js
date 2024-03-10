// For Login
export const loginFormConfig = [
  {
    id: "email",
    type: "email",
    placeholder: "hello@example.com",
    label: "Email", // Label added here
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    label: "Password", // Label added here
  },
];

// For Signup
export const signupFormConfig = [
  { id: "name", type: "text", placeholder: "Name", label: "Name" },
  {
    id: "email",
    type: "email",
    placeholder: "Example@email.com",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    toggleVisibility: true,
  },
  { type: "recaptcha", siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY }, 
  {
    id: "termsAccepted",
    type: "checkbox",
    label: "I accept the terms of service and privacy policy",
  },
];
