import { createMailto, submitContact, validateContact } from "./contact";

const values = {
  name: "Visitor & Co",
  email: "visitor@example.com",
  message: "Hello! A project idea with & and ? and #.",
};

test("rejects whitespace-only fields and malformed email addresses", () => {
  expect(
    Object.keys(
      validateContact({ name: "  ", email: "bad@email", message: "    " }),
    ),
  ).toEqual(["name", "email", "message"]);
  expect(validateContact(values)).toEqual({});
});

test("encodes the complete email draft without losing special characters", () => {
  const url = new URL(createMailto(values, "jebzterc@gmail.com"));
  expect(url.searchParams.get("subject")).toBe(
    "Portfolio enquiry from Visitor & Co",
  );
  expect(url.searchParams.get("body")).toContain(values.message);
  expect(url.searchParams.get("body")).toContain(
    "\nEmail: visitor@example.com\n\n",
  );
});

test("submits the contact fields to the configured endpoint", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true });
  await submitContact(values, "https://formspree.io/f/test");
  expect(fetch).toHaveBeenCalledWith(
    "https://formspree.io/f/test",
    expect.objectContaining({ method: "POST", body: JSON.stringify(values) }),
  );
});

test("rejects failed service responses instead of showing false success", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false });
  await expect(
    submitContact(values, "https://formspree.io/f/test"),
  ).rejects.toThrow("Message could not be sent");
});

test("propagates network failures so the form can preserve the message for retry", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network unavailable"));
  await expect(
    submitContact(values, "https://formspree.io/f/test"),
  ).rejects.toThrow("Network unavailable");
});

test("aborts requests that exceed the timeout", async () => {
  jest.useFakeTimers();
  global.fetch = jest.fn(
    (url, options) =>
      new Promise((resolve, reject) => {
        options.signal.addEventListener("abort", () =>
          reject(new Error("Timed out")),
        );
      }),
  );
  const result = submitContact(values, "https://formspree.io/f/test");
  const assertion = expect(result).rejects.toThrow("Timed out");
  jest.advanceTimersByTime(15000);
  await assertion;
  jest.useRealTimers();
});
