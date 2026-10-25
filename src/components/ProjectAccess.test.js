import { render, screen, within } from "@testing-library/react";
import ProjectAccess, { formatFileSize } from "./ProjectAccess";
import { projects } from "../data/projects";

const bitulok = projects.find((project) => project.id === "bitulok-express");

test("opens the verified web dashboards securely without demo credentials", () => {
  render(<ProjectAccess project={bitulok} />);
  const admin = screen.getByRole("link", { name: /Open Admin Dashboard/ });
  const restaurant = screen.getByRole("link", {
    name: /Open Restaurant Dashboard/,
  });
  expect(admin).toHaveAttribute(
    "href",
    "https://bitulok-express-6aba0.web.app",
  );
  expect(restaurant).toHaveAttribute(
    "href",
    "https://bitulok-express-restaurant.web.app",
  );
  [admin, restaurant].forEach((link) => {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
  expect(screen.queryByText(/Demo login/)).not.toBeInTheDocument();
});

test("oversized unpublished APKs show disabled Coming soon actions with actual sizes", () => {
  render(<ProjectAccess project={bitulok} />);
  expect(
    screen.getByRole("button", {
      name: "Customer App: coming soon, 111.91 MB",
    }),
  ).toBeDisabled();
  expect(
    screen.getByRole("button", { name: "Rider App: coming soon, 120.81 MB" }),
  ).toBeDisabled();
  expect(
    screen.queryByRole("link", { name: /Download/ }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByText(
      "Android only. You may need to allow installs from unknown sources.",
    ),
  ).toBeInTheDocument();
});

test("future configured APKs get a download filename and measured size", () => {
  const project = {
    ...bitulok,
    links: [
      {
        id: "customer",
        label: "Customer App",
        type: "apk",
        url: "/downloads/test-fixture.apk",
        sizeBytes: 12345678,
        downloadName: "bitulok-customer.apk",
      },
    ],
  };
  render(<ProjectAccess project={project} />);
  const download = screen.getByRole("link", {
    name: "Download Customer App, 12.35 MB, Android APK",
  });
  expect(download).toHaveAttribute("download", "bitulok-customer.apk");
  expect(download).toHaveAttribute("href", "/downloads/test-fixture.apk");
  expect(within(download).getByText("12.35 MB")).toBeInTheDocument();
  expect(formatFileSize(null)).toBeNull();
});
