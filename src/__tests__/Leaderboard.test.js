import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Leaderboard from "../components/Leaderboard";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";

describe("Leaderboard", () => {
  let store;

  beforeEach(async () => {
    store = createStore(reducers, applyMiddleware(thunk));

    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("will display the correct user name, number of questions asked, and number of questions answered", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leaderboard"]}>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole("row", { name: /^avatar Sarah Edo sarahedo 4 2$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: /^avatar Tyler McGinnis tylermcginnis 2 2$/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: /^avatar Mike Tsamis mtsamis 3 2$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: /^avatar Zenobia Oshikanlu zoshikanlu 1 0$/i,
      })
    ).toBeInTheDocument();
  });
});
