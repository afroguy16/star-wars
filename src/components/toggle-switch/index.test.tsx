import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import ToggleSwitch from ".";

describe("ToggleSwitch", () => {
  let mockOnToggleSwitch: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnToggleSwitch = jest.fn()

    const utils = render(<ToggleSwitch onToggleSwitch={mockOnToggleSwitch} />);
  });

  it("should call onToggleSwitch callback if toggle clicked", () => {
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    
    expect(mockOnToggleSwitch).toHaveBeenCalled();
  });
});
