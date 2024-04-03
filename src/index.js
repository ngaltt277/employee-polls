import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
