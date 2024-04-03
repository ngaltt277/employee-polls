import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";
import "@testing-library/jest-dom";

describe("Login", () => {
  const store = createStore(reducers, applyMiddleware(thunk));

  it("matches the snapshot", () => {
    const { component } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("will verify that a username field, password field, and submit button are present", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("will display an error if the username or password is incorrect", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const username = screen.getByTestId("username");
    fireEvent.change(username, { target: { value: "tyler" } });
    const password = screen.getByTestId("password");
    fireEvent.change(password, { target: { value: "password" } });

    const loginButton = screen.getByTestId("login-button");
    fireEvent.click(loginButton);
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });
});
