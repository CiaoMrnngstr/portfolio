import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/projects";
import { profile } from "./data/profile";

beforeEach(() => {
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
  expect(within(region).getAllByRole("article")).toHaveLength(4);
  projects.forEach((project) =>
    expect(
      within(region).getByRole("heading", { name: project.title }),
    ).toBeInTheDocument(),
  );
  expect(
    projects
      .filter((project) => !project.featured)
      .map((project) => project.images.length),
  ).toEqual([4, 4, 4]);
  expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "href",
    "/cv.pdf",
  );
  expect(
    screen.getByRole("link", { name: /Download APK/ }),
  ).toHaveAttribute("href", "/myapp.apk");
  expect(screen.getByText(profile.location)).toBeInTheDocument();
  expect(screen.getByText(profile.phone)).toBeInTheDocument();
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
  fireEvent.click(screen.getByRole("button", { name: "All 4" }));
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
    expect.stringContaining("mailto:jebzterc@gmail.com?subject="),
  );
  expect(
    screen.queryByText("Thanks! Your message has been sent."),
  ).not.toBeInTheDocument();
});
