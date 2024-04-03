import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import QuestionPage from "../components/QuestionPage";

describe("QuestionPage", () => {
  let store;

  beforeEach(async () => {
    store = createStore(reducers, applyMiddleware(thunk));

    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser("tylermcginnis"));
  });

  it("will display percentage of people voted for an option for answered polls", () => {
    const questionId = "xj352vofupe1dqz9emx13r";

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/questions/${questionId}`]}>
          <Routes>
            <Route path="/questions/:questionId" element={<QuestionPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("optionOne").textContent).toEqual(
      "2 vote(s) (50%)"
    );
    expect(screen.getByTestId("optionTwo").textContent).toEqual(
      "1 vote(s) (25%)"
    );
  });
});
