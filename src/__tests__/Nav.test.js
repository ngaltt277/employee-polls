import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Nav from "../components/Nav";
import "@testing-library/jest-dom";

describe("Nav", () => {
  let store;

  beforeEach(async () => {
    store = createStore(reducers, applyMiddleware(thunk));

    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("will display all expected links", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Nav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "New" })).toHaveAttribute(
      "href",
      "/add"
    );
    expect(screen.getByRole("link", { name: "Leaderboard" })).toHaveAttribute(
      "href",
      "/leaderboard"
    );
  });
});
