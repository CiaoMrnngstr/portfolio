import { fireEvent, render, screen } from "@testing-library/react";
import Contact from "./Contact";

test("focuses invalid fields and creates a draft without a network request", () => {
  global.fetch = jest.fn();
  render(<Contact />);
  fireEvent.click(screen.getByRole("button", { name: "Create email draft" }));
  expect(screen.getByLabelText("Your name")).toHaveFocus();
  expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Visitor & Co" } });
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Let's talk about an internship & a project." } });
  fireEvent.click(screen.getByRole("button", { name: "Create email draft" }));
  const draft = screen.getByRole("link", { name: "Open email draft" });
  const url = new URL(draft.href);
  expect(url.pathname).toBe("cjebzter@gmail.com");
  expect(url.searchParams.get("body")).toContain("internship & a project");
  expect(screen.getByRole("status")).toHaveTextContent("Nothing has been sent");
  expect(fetch).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "An updated message with more detail." } });
  expect(screen.queryByRole("link", { name: "Open email draft" })).not.toBeInTheDocument();
});
