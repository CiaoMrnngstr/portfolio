import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Contact from "./Contact";

function fillForm() {
  fireEvent.change(screen.getByLabelText(/Your name/), {
    target: { value: "Visitor" },
  });
  fireEvent.change(screen.getByLabelText(/Email address/), {
    target: { value: "visitor@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Your message/), {
    target: { value: "A meaningful project enquiry." },
  });
}

test("shows success and clears the form only after a successful service response", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true });
  render(<Contact formEndpoint="https://formspree.io/f/test" />);
  fillForm();
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
  expect(
    await screen.findByText("Thanks! Your message has been sent."),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/Your message/)).toHaveValue("");
});

test("keeps the entered message and re-enables submission after a failed service response", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false });
  render(<Contact formEndpoint="https://formspree.io/f/test" />);
  fillForm();
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
  expect(
    await screen.findByText(/Unable to send your message/),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/Your message/)).toHaveValue(
    "A meaningful project enquiry.",
  );
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Send Message" })).toBeEnabled(),
  );
});

test("shows a busy state and preserves text while a submission is pending", async () => {
  let resolve;
  global.fetch = jest.fn(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  render(<Contact formEndpoint="https://formspree.io/f/test" />);
  fillForm();
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
  expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
  expect(screen.getByRole("form", { name: "Contact form" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  expect(screen.getByLabelText(/Your message/)).toHaveValue(
    "A meaningful project enquiry.",
  );
  await act(async () => {
    resolve({ ok: false });
  });
  expect(screen.getByLabelText(/Your message/)).toHaveValue(
    "A meaningful project enquiry.",
  );
});
