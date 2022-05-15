import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from ".";

const FAKE_CHILDREN = <p>Hello dropdown</p>
const FAKE_LABEL = 'fake label'

describe("Dropdown", () => {
  beforeEach(() => {
    render(<Dropdown label={FAKE_LABEL}>{FAKE_CHILDREN}</Dropdown>);
  });

  afterEach(cleanup);

  it("should toggle inner if button is clicked", () => {
    const toggleButton = screen.getAllByRole('button')[0]

    userEvent.click(toggleButton)
    let innerContent = screen.queryByTestId('inner-content')
    expect(toggleButton).toHaveAttribute('aria-expanded', "true")
    expect(innerContent).toHaveAttribute('aria-expanded', "true")

    userEvent.click(toggleButton)
    innerContent = screen.queryByTestId('inner-content')
    expect(toggleButton).toHaveAttribute('aria-expanded', "false")
    expect(innerContent).toBeFalsy()
  });
});
