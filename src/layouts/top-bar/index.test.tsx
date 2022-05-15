import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopBar from ".";

describe("TopBar", () => {
  let mockOnToggleSwitch: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnToggleSwitch = jest.fn()

    const utils = render(<TopBar onToggleSwitch={mockOnToggleSwitch} />);
  });

  it("should call onToggleSwitch callback if toggle clicked", () => {
    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    
    expect(mockOnToggleSwitch).toHaveBeenCalled();
  });
});
