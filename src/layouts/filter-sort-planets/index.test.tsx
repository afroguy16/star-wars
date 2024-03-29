import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSort from ".";
import { PlanetsProvider } from "../../store/PlanetsContext";

describe("FilterSort", () => {
  let mockOnTriggeredCallBack: jest.Mock<any, any>;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnTriggeredCallBack = jest.fn();

    render(
      <PlanetsProvider>
        <FilterSort onTriggered={mockOnTriggeredCallBack} />
      </PlanetsProvider>
    );
  });

  it("should call onTriggered callback if toggle Sort value changes", () => {
    const sortElement = screen.getByTestId("sort");
    const toggleButton = sortElement.getElementsByTagName('button')[0]

    userEvent.click(toggleButton)

    const sortOptionsElement = sortElement.getElementsByTagName('li')
    const firstOptionElement = sortOptionsElement[0]
    
    userEvent.click(firstOptionElement);
    expect(mockOnTriggeredCallBack).toHaveBeenCalled();
  });
});
