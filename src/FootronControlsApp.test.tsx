import React from "react";
import { render, screen } from "@testing-library/react";
import FootronControlsApp from "./FootronControlsApp";

test("renders learn react link", () => {
  render(<FootronControlsApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
