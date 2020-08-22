import React from "react";
import ProjectList from "./ProjectList";
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

describe("ProjectList", () => {
  it("can show list cards", async () => {
    RequestMock.mockImplementation(baseURL => ({
      baseURL,
      get: () =>
        Promise.resolve([
          {
            _id: "gaejgea7g8hea",
            name: "jatim park map",
            description: "jatim park map description",
          },
        ] as any),
      delete: jest.fn(),
      put: jest.fn(),
      post: jest.fn(),
    }));
    const { findByText } = render(<ProjectList />);
    const cardName = await findByText("jatim park map");
    const cardDescription = await findByText("jatim park map description");
    expect(cardName).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
  });

  it("can show succes notification if delete confirm accepted", async () => {
    RequestMock.mockImplementation(baseURL => ({
      baseURL,
      get: jest.fn(),
      delete: () =>
        Promise.resolve({
          _id: "gaejgea7g8hea",
          name: "jatim park map",
          description: "jatim park map description",
        } as any),
      put: jest.fn(),
      post: jest.fn(),
    }));
    const { findByTitle, findByText } = render(<ProjectList />);
    const cardDelete = await findByTitle("cardDelete");
    act(() => {
      fireEvent.click(cardDelete);
    });
    const acceptButton = await findByText("Yes");
    act(() => {
      fireEvent.click(acceptButton);
    });
    const succesDeleteNotification = await findByText("Project delete success");
    expect(succesDeleteNotification).toBeInTheDocument();
  });
});
