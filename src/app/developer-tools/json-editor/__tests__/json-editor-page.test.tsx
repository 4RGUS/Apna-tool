import type { ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JsonEditorPage from "../page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: ReactNode; href: string }) => (
    <a {...props}>{children}</a>
  ),
}));

describe("JsonEditorPage", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the initial JSON sample", () => {
    render(<JsonEditorPage />);

    expect(
      screen.getByRole("heading", { name: /json editor & formatter/i })
    ).toBeInTheDocument();
    const textarea = screen.getByLabelText(/json input/i) as HTMLTextAreaElement;
    expect(textarea.value).toContain(`"Ada Lovelace"`);
  });

  it("formats valid JSON and clears any prior error", async () => {
    const user = userEvent.setup();
    render(<JsonEditorPage />);

    const textarea = screen.getByLabelText(/json input/i);

    fireEvent.change(textarea, {
      target: { value: '{"foo":1,"bar":[2,3]}' },
    });
    await user.click(screen.getByRole("button", { name: /format json/i }));

    expect(textarea).toHaveValue(`{
  "foo": 1,
  "bar": [
    2,
    3
  ]
}`);
    expect(screen.queryByText(/unexpected token/i)).not.toBeInTheDocument();
  });

  it("shows a helpful error for invalid JSON", async () => {
    const user = userEvent.setup();
    render(<JsonEditorPage />);

    const textarea = screen.getByLabelText(/json input/i);

    fireEvent.change(textarea, { target: { value: "{ invalid json" } });
    await user.click(screen.getByRole("button", { name: /format json/i }));

    expect(
      screen.getByText(/expected property name or '}'/i)
    ).toBeInTheDocument();
  });

  it("copies the JSON to clipboard and shows a status message", async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<JsonEditorPage />);

    await user.click(screen.getByRole("button", { name: /copy json/i }));

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining(`"Ada Lovelace"`)
    );
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
  });

  it("saves the JSON to a downloadable file and shows a status message", async () => {
    const user = userEvent.setup();
    const createObjectURL = jest.fn(() => "blob:mock");
    const revokeObjectURL = jest.fn();
    const originalURL = window.URL;
    Object.defineProperty(window, "URL", {
      value: { ...originalURL, createObjectURL, revokeObjectURL },
      writable: true,
    });

    const anchorEl = document.createElement("a");
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = jest
      .spyOn(document, "createElement")
      .mockImplementation(((tagName: string, options?: any) => {
        if (tagName === "a") {
          return anchorEl;
        }
        return originalCreateElement(tagName as any, options as any);
      }) as typeof document.createElement);
    const appendSpy = jest.spyOn(document.body, "appendChild");
    const removeSpy = jest.spyOn(document.body, "removeChild");
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    render(<JsonEditorPage />);
    await user.click(screen.getByRole("button", { name: /save json/i }));

    await waitFor(() => {
      expect(appendSpy).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(anchorEl.download).toBe("json-editor.json");
    });
    expect(anchorEl.href).toBe("blob:mock");
    expect(appendSpy).toHaveBeenCalledWith(anchorEl);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(anchorEl);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");
    await waitFor(() =>
      expect(
        screen.getByText(/saved as json-editor\.json/i)
      ).toBeInTheDocument()
    );

    createElementSpy.mockRestore();
    Object.defineProperty(window, "URL", { value: originalURL });
  });
});
