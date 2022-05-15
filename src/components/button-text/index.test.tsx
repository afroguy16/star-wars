import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import ButtonText from ".";

const FAKE_TEXT = '>'

describe("ButtonText", () => {
  let baseElement: HTMLElement;
  let mockOnClick: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClick = jest.fn()

    const utils = render(<ButtonText text={FAKE_TEXT} onClick={mockOnClick} />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should call onClick callback if button is clicked", () => {
    const button = screen.getByRole('button')

    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalled();
  });
});
