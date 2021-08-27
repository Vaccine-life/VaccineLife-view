import React from "react";
import { render, hydrate } from "react-dom";
import "./index.css";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "./redux/configStore";
import reportWebVitals from "./reportWebVitals";
import App from "./shared/App";
import FontStyle from "./styles/FontStyle";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <HelmetProvider>
        <ConnectedRouter history={history}>
          <FontStyle>
            <App />
          </FontStyle>
        </ConnectedRouter>
      </HelmetProvider>
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <HelmetProvider>
        <ConnectedRouter history={history}>
          <FontStyle>
            <App />
          </FontStyle>
        </ConnectedRouter>
      </HelmetProvider>
    </Provider>,
    rootElement
  );
}

/* 
ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <ConnectedRouter history={history}>
        <FontStyle>
          <App />
        </FontStyle>
      </ConnectedRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
