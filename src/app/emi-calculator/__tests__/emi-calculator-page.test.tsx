import type { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmiCalculatorPage from "../page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: ReactNode; href: string }) => (
    <a {...props}>{children}</a>
  ),
}));

const getResultValue = (label: string) => {
  const labelNode = screen.getByText(label);
  const row = labelNode.closest("div");

  if (!row) {
    throw new Error(`Unable to find result row for label: ${label}`);
  }

  const value = row.querySelector("span:last-child");

  if (!value) {
    throw new Error(`Unable to find value cell for label: ${label}`);
  }

  return value.textContent ?? "";
};

describe("EmiCalculatorPage", () => {
  it("shows the default EMI calculation for initial values", () => {
    render(<EmiCalculatorPage />);

    expect(
      screen.getByRole("heading", { name: /emi calculator/i })
    ).toBeInTheDocument();

    expect(getResultValue("Monthly EMI")).toBe("₹17,356");
    expect(getResultValue("Total interest payable")).toBe("₹2,165,552");
    expect(getResultValue("Total amount payable")).toBe("₹4,165,552");
    expect(getResultValue("Tenure")).toBe("240 months");
  });

  it("updates the EMI calculation when the loan details change", async () => {
    render(<EmiCalculatorPage />);
    const user = userEvent.setup();

    const principalInput = screen.getByLabelText(/loan amount/i);
    const rateInput = screen.getByLabelText(/interest rate/i);
    const tenureInput = screen.getByLabelText(/tenure/i);

    await user.clear(principalInput);
    await user.type(principalInput, "500000");

    await user.clear(rateInput);
    await user.type(rateInput, "7.5");

    await user.clear(tenureInput);
    await user.type(tenureInput, "15");

    await waitFor(() => {
      expect(getResultValue("Monthly EMI")).toBe("₹4,635");
      expect(getResultValue("Total interest payable")).toBe("₹334,311");
      expect(getResultValue("Total amount payable")).toBe("₹834,311");
      expect(getResultValue("Tenure")).toBe("180 months");
    });
  });

  describe("snapshots", () => {
    it("matches the default render snapshot", () => {
      const { asFragment } = render(<EmiCalculatorPage />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("matches the recalculated snapshot after updating inputs", async () => {
      const user = userEvent.setup();
      const { asFragment } = render(<EmiCalculatorPage />);

      await user.clear(screen.getByLabelText(/loan amount/i));
      await user.type(screen.getByLabelText(/loan amount/i), "500000");

      await user.clear(screen.getByLabelText(/interest rate/i));
      await user.type(screen.getByLabelText(/interest rate/i), "7.5");

      await user.clear(screen.getByLabelText(/tenure/i));
      await user.type(screen.getByLabelText(/tenure/i), "15");

      await waitFor(() => {
        expect(getResultValue("Monthly EMI")).toBe("₹4,635");
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
