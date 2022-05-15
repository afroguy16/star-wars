import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Button from ".";

const FAKE_TEXT = '>'

describe("Button", () => {
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn()

    render(<Button text={FAKE_TEXT} onClick={mockOnClick} />);
  });

  it("should call onClick callback if button is clicked", () => {
    const button = screen.getByRole('button')

    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalled();
  });
});
