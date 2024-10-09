import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Enroll, UnEnroll } from "./MaterialButton.stories";
import { describe, test, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';

describe("MaterialButton", () => {
  test("Enroll button renders with correct text", () => {
    render(<Enroll {...Enroll.args} />);
    const buttonElement = screen.getByText(/신청하기/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("UnEnroll button renders with correct text", () => {
    render(<UnEnroll {...UnEnroll.args} />);
    const buttonElement = screen.getByText(/신청완료/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("Enroll button click event works", () => {
    const handleClick = jest.fn();
    render(<Enroll {...Enroll.args} onClick={handleClick} />);
    const buttonElement = screen.getByText(/신청하기/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("UnEnroll button click event works", () => {
    const handleClick = jest.fn();
    render(<UnEnroll {...UnEnroll.args} onClick={handleClick} />);
    const buttonElement = screen.getByText(/신청완료/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});