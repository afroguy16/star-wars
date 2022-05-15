import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import TopBar from ".";

describe("TopBar", () => {
  let baseElement: HTMLElement;
  let mockOnToggleSwitch: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnToggleSwitch = jest.fn()

    const utils = render(<TopBar onToggleSwitch={mockOnToggleSwitch} />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should call onToggleSwitch callback if toggle clicked", () => {
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    
    expect(mockOnToggleSwitch).toHaveBeenCalled();
  });
});
