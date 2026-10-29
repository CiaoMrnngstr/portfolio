import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/projects";
import { profile } from "./data/profile";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); this.dispatchEvent(new Event("close")); };
  window.matchMedia = jest
    .fn()
    .mockImplementation((query) => ({
      matches: query.includes("dark"),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  window.localStorage.clear();
});

test("preserves all original projects, galleries, downloads, and personal information", () => {
  render(<App />);
  const region = screen.getByRole("region", { name: "My Projects" });
  expect(within(region).getAllByRole("article")).toHaveLength(5);
  projects.forEach((project) =>
    expect(
      within(region).getByRole("heading", { name: project.title }),
    ).toBeInTheDocument(),
  );
  expect(
    projects
      .filter((project) => ["phinma", "pmcca", "kicks"].includes(project.id))
      .map((project) => project.images.length),
  ).toEqual([4, 4, 4]);
  expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "href",
    "/cv.pdf",
  );
  expect(
    screen.getByRole("link", { name: /Download APK/ }),
  ).toHaveAttribute("href", "/myapp.apk");
  expect(screen.getAllByText(profile.location).length).toBeGreaterThan(0);
  expect(screen.getByText(profile.phone)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Mobile Number/ })).toHaveAttribute("href", "tel:+639561896602");
});

test("filters projects and restores all projects", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Mobile", exact: true }));
  expect(
    screen.queryByRole("heading", { name: "Kicks Simple Responsive Website" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Bitulok Express" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "PHINMA AU Student Credential App" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Fitness Tracker App" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "All 5" }));
  expect(
    screen.getByRole("heading", { name: "Kicks Simple Responsive Website" }),
  ).toBeInTheDocument();
});

test("persists an explicit theme preference", () => {
  render(<App />);
  fireEvent.click(
    screen.getByRole("button", { name: "Switch to light theme" }),
  );
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  expect(localStorage.getItem("ciao-theme")).toBe("light");
});

test("validates the contact form then creates an honest email draft", () => {
  render(<App />);
  const submit = screen.getByRole("button", { name: "Create email draft" });
  fireEvent.click(submit);
  expect(screen.getByLabelText(/Your name/)).toHaveFocus();
  expect(
    screen.getByText("Please enter a valid email address."),
  ).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Your name/), {
    target: { value: "Test visitor" },
  });
  fireEvent.change(screen.getByLabelText(/Email address/), {
    target: { value: "visitor@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Your message/), {
    target: { value: "I would like to talk about a project." },
  });
  fireEvent.click(submit);
  expect(
    screen.getByRole("link", { name: /Open email draft/ }),
  ).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:cjebzter@gmail.com?subject="),
  );
  expect(
    screen.queryByText("Thanks! Your message has been sent."),
  ).not.toBeInTheDocument();
});

test("shows four real certificate previews and keeps TESDA strictly text-only", () => {
  render(<App />);
  const region = screen.getByRole("region", { name: "Certifications" });
  expect(within(region).getAllByRole("article")).toHaveLength(5);
  expect(within(region).getAllByRole("img")).toHaveLength(4);
  [
    "Oracle Cloud Infrastructure 2025 Certified Networking Professional",
    "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    "Oracle Data Platform 2025 Certified Foundations Associate",
    "Linux Unhatched",
  ].forEach((title) => {
    expect(within(region).getByRole("heading", { name: title })).toBeInTheDocument();
  });
  const tesda = within(region).getByRole("article", { name: "TESDA NC II – Computer Systems Servicing" });
  expect(within(tesda).getByText("TESDA · 2026")).toBeInTheDocument();
  expect(tesda.querySelector("img, a, button, iframe, embed, object")).toBeNull();
});

test("navigates the Fitness gallery and restores focus after closing its viewer", () => {
  render(<App />);
  const opener = screen.getByRole("button", { name: "Enlarge Home", exact: true });
  opener.focus();
  fireEvent.click(opener);
  const dialog = screen.getByRole("dialog", { name: "Fitness Tracker App image viewer" });
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(dialog, { key: "ArrowRight" });
  expect(within(dialog).getByRole("img")).toHaveAttribute("alt", expect.stringContaining("exercise library"));
  fireEvent.click(within(dialog).getByRole("button", { name: "Zoom image" }));
  expect(within(dialog).getByRole("button", { name: "Fit image to screen" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(within(dialog).getByRole("button", { name: "Close image viewer" }));
  expect(screen.queryByRole("dialog", { name: "Fitness Tracker App image viewer" })).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
  expect(document.body.style.overflow).toBe("");
});
