import React from "react";
import ReactDOM from "react-dom";
import Main from "./App.js";
import styles from "./style.scss"
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Main/>
  </BrowserRouter>,
  document.getElementById("root")
);