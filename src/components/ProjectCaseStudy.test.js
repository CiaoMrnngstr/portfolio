import { render, screen } from "@testing-library/react";
import ProjectCaseStudy from "./ProjectCaseStudy";
import { projects } from "../data/projects";

test("shows the supplied capstone facts and an honest learning placeholder", () => {
  render(<ProjectCaseStudy study={projects[0].caseStudy} />);
  expect(
    screen.getByRole("heading", { name: "What I built" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Tech stack" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Challenges and what I learned" }),
  ).toBeInTheDocument();
  expect(screen.getByText(/sole developer/)).toHaveTextContent(
    "Gabaldon, Nueva Ecija",
  );
  expect(screen.getByText(/COD and QR Ph/)).toBeInTheDocument();
  expect(screen.getByText("Placeholder — to be completed")).toBeInTheDocument();
});

test("replaces the placeholder once the author supplies a learning reflection", () => {
  render(
    <ProjectCaseStudy
      study={{
        ...projects[0].caseStudy,
        learning: "Author-supplied reflection for this test.",
      }}
    />,
  );
  expect(
    screen.getByText("Author-supplied reflection for this test."),
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Placeholder — to be completed"),
  ).not.toBeInTheDocument();
});
