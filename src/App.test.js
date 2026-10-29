import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/projects";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  Element.prototype.scrollIntoView = jest.fn();
  window.requestAnimationFrame = (callback) => { callback(); return 1; };
  window.cancelAnimationFrame = jest.fn();
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query.includes("prefers-color-scheme: dark"),
    addEventListener: jest.fn(), removeEventListener: jest.fn(),
  }));
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn(),
  }));
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
});

test("preserves five real projects, original assets, and all supplied destinations", () => {
  render(<App />);
  const work = screen.getByRole("region", { name: "Ideas made real." });
  expect(within(work).getAllByRole("article")).toHaveLength(5);
  projects.forEach(project => expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument());
  expect(projects.filter(p => ["phinma", "pmcca", "kicks"].includes(p.id)).map(p => p.images.length)).toEqual([4,4,4]);
  expect(screen.getByRole("link", { name: "Admin dashboard" })).toHaveAttribute("href", "https://bitulok-express-6aba0.web.app/login");
  expect(screen.getByRole("link", { name: "Restaurant dashboard" })).toHaveAttribute("href", "https://bitulok-express-restaurant.web.app/login");
  expect(screen.getByRole("link", { name: "Download Android APK" })).toHaveAttribute("href", "/myapp.apk");
  expect(screen.getAllByText("TODO · download")).toHaveLength(2);
  expect(screen.getByRole("link", { name: "Jobs180" })).toHaveAttribute("href", "https://jebztercatacutan.jobs180.com");
});

test("keeps the CV route and filename, removes the phone, and protects TESDA", () => {
  render(<App />);
  screen.getAllByRole("link", { name: "Download CV" }).forEach(link => {
    expect(link).toHaveAttribute("href", "/cv.pdf");
    expect(link).toHaveAttribute("download", "Jebzter_Catacutan_cv.pdf");
  });
  expect(document.querySelector('a[href^="tel:"]')).toBeNull();
  expect(document.body.textContent).not.toMatch(/956.?189.?6602/);
  expect(document.querySelector(".tesda-qualification").querySelector("img,a,button,iframe,embed,object")).toBeNull();
});

test("searches the command palette and opens a project with the keyboard", () => {
  render(<App />);
  fireEvent.keyDown(document, { key: "k", ctrlKey: true });
  const search = screen.getByRole("combobox", { name: "Search commands" });
  expect(search).toHaveFocus();
  fireEvent.change(search, { target: { value: "PMCCA" } });
  expect(screen.getAllByRole("option")).toHaveLength(1);
  fireEvent.keyDown(search, { key: "Enter" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(document.getElementById("case-pmcca")).toHaveAttribute("open");
  expect(document.getElementById("project-pmcca")).toHaveFocus();
});

test("handles empty searches, wraps palette selection, and returns focus on dismissal", () => {
  render(<App />);
  const trigger = screen.getByRole("button", { name: "Open command palette" });
  trigger.focus(); fireEvent.click(trigger);
  const search = screen.getByRole("combobox", { name: "Search commands" });
  fireEvent.keyDown(search, { key: "ArrowUp" });
  const options = screen.getAllByRole("option");
  expect(options[options.length - 1]).toHaveAttribute("aria-selected", "true");
  fireEvent.change(search, { target: { value: "nothing matches this" } });
  expect(within(screen.getByRole("dialog", { name: "Command palette" })).getByRole("status")).toHaveTextContent("No matching commands");
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close Command palette" }));
  expect(trigger).toHaveFocus();
});

test("explains the selected architecture node and keeps just one selection", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Rider React Native" }));
  expect(screen.getByRole("button", { name: "Rider React Native" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "Firebase Shared platform" })).toHaveAttribute("aria-pressed", "false");
  expect(document.getElementById("architecture-detail")).toHaveTextContent("rider assignment");
});

test("changes the gallery, supports keyboard viewing, and restores focus", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /02 Exercise library/ }));
  const trigger = screen.getByRole("button", { name: "Enlarge Exercise library" });
  trigger.focus(); fireEvent.click(trigger);
  const viewer = screen.getByRole("dialog", { name: "Fitness Tracker App screenshots" });
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(viewer, { key: "ArrowRight" });
  expect(within(viewer).getByRole("img")).toHaveAttribute("alt", expect.stringContaining("challenge generator"));
  fireEvent.click(within(viewer).getByRole("button", { name: "Zoom image" }));
  expect(within(viewer).getByRole("button", { name: "Fit image" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(within(viewer).getByRole("button", { name: "Close Fitness Tracker App screenshots" }));
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe("");
});

test("persists a theme choice and allows the palette to change it", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
  expect(document.documentElement.dataset.theme).toBe("light");
  expect(localStorage.getItem("ciao-theme")).toBe("light");
  fireEvent.keyDown(document, { key: "k", metaKey: true });
  const search = screen.getByRole("combobox");
  fireEvent.change(search, { target: { value: "theme" } });
  fireEvent.keyDown(search, { key: "Enter" });
  expect(document.documentElement.dataset.theme).toBe("dark");
});
