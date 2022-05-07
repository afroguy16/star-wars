import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Loading from ".";

const FAKE_TEXT = 'Loading'

describe("Loading", () => {
  let baseElement: HTMLElement;
  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(<Loading text={FAKE_TEXT} />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render text props", () => {
    const textElement = screen.getByText(FAKE_TEXT)

    expect(textElement).toBeInTheDocument()
  });
});
