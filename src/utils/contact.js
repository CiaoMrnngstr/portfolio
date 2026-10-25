export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Please write at least 10 characters.";
  return errors;
}

export function createMailto(values, recipient) {
  const subject = encodeURIComponent(
    `Portfolio enquiry from ${values.name.trim()}`,
  );
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`,
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export async function submitContact(values, endpoint) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        "Message could not be sent. Please try again or email me directly.",
      );
  } finally {
    clearTimeout(timeout);
  }
}
