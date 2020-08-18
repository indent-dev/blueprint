import React from "react";
import ProjectForm from "./ProjectForm";
import { render, fireEvent, act } from "@testing-library/react";
import Request from "../../../utils/Request";

jest.mock("../../../utils/Request");

const RequestMock = Request as jest.MockedClass<typeof Request>;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("ProjectForm", () => {
  it("can show error validation if form empty", async () => {
    const { getByText, findAllByText, findByText } = render(<ProjectForm />);
    const createButton = getByText("Create New Project");
    act(() => {
      fireEvent.click(createButton);
    });

    const submitButton = (await findAllByText("Create Project")).find(
      el => el.parentElement?.tagName === "BUTTON"
    )?.parentElement;
    if (submitButton)
      act(() => {
        fireEvent.click(submitButton);
      });

    const nameErrorMessage = await findByText("name is a required field");
    const descriptionErrorMessage = await findByText(
      "description is a required field"
    );
    expect(nameErrorMessage).toBeInTheDocument();
    expect(descriptionErrorMessage).toBeInTheDocument();
  });

  it("can show success notification if create project success", async () => {
    RequestMock.mockImplementation(baseURL => ({
      baseURL,
      get: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
      post: () =>
        Promise.resolve({
          _id: "gaejgea7g8hea",
          name: "jatim park map",
          description: "jatim park map description",
        } as any),
    }));

    const { getByText, findByLabelText, findAllByText, findByText } = render(
      <ProjectForm />
    );
    const createButton = getByText("Create New Project");
    act(() => {
      fireEvent.click(createButton);
    });

    const inputName = await findByLabelText("Name");
    const inputDescription = await findByLabelText("Description");
    act(() => {
      fireEvent.change(inputName, { target: { value: "jatim park map" } });
    });
    act(() => {
      fireEvent.change(inputDescription, {
        target: { value: "jatim park map description" },
      });
    });

    const submitButton = (await findAllByText("Create Project")).find(
      el => el.parentElement?.tagName === "BUTTON"
    )?.parentElement;
    if (submitButton)
      act(() => {
        fireEvent.click(submitButton);
      });

    const successNotification = await findByText("Project creation success");
    expect(successNotification).toBeInTheDocument();
  });

  it("can show failed notification if create project failed", async () => {
    RequestMock.mockImplementation(baseURL => ({
      baseURL,
      get: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
      post: () =>
        Promise.reject({
          status: "error",
          message: "failed to create project",
        }),
    }));

    const { getByText, findByLabelText, findAllByText, findByText } = render(
      <ProjectForm />
    );
    const createButton = getByText("Create New Project");
    act(() => {
      fireEvent.click(createButton);
    });

    const inputName = await findByLabelText("Name");
    const inputDescription = await findByLabelText("Description");
    act(() => {
      fireEvent.change(inputName, { target: { value: "jatim park map" } });
    });
    act(() => {
      fireEvent.change(inputDescription, {
        target: { value: "jatim park map description" },
      });
    });

    const submitButton = (await findAllByText("Create Project")).find(
      el => el.parentElement?.tagName === "BUTTON"
    )?.parentElement;
    if (submitButton)
      act(() => {
        fireEvent.click(submitButton);
      });

    const failedNotification = await findByText("Project creation failed");
    expect(failedNotification).toBeInTheDocument();
  });
});
