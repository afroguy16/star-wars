import { render, cleanup } from "@testing-library/react";
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
});
