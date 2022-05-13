import { render, cleanup, screen, fireEvent } from "@testing-library/react";
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
    fireEvent.change(sortElement, { target: { value: "residents" } });

    expect(mockOnTriggeredCallBack).toHaveBeenCalled();
  });
});
