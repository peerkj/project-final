import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from "mobx-react"; // MobX 에서 사용하는 Provider
import RootStore from "./stores";

import { BrowserRouter as Router } from "react-router-dom";

const root = new RootStore(); // *** 루트 스토어 생성

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
});

ReactDOM.render(
  <Provider {...root}>
    {/* *** ...root 으로 스토어 모두 자동으로 설정 */}
    <MuiThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
