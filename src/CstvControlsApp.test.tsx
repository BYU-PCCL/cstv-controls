import React from "react";
import { render, screen } from "@testing-library/react";
import CstvControlsApp from "./CstvControlsApp";

test("renders learn react link", () => {
  render(<CstvControlsApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
