import { render, cleanup, screen } from "@testing-library/react";
import Planets from ".";

describe("Planets", () => {
  let baseElement: HTMLElement;

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(<Planets />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render Loading planets... on Planets load", () => {
    const loadingElement = screen.getByTestId('loading')
    expect(loadingElement).toBeTruthy()
  });
});
