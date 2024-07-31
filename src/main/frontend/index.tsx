import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import router from "./route"
import 'bootstrap/dist/css/bootstrap.css';
import './themes/phone-book/styles.css'
import store from "./storage/store"
import App from "./app"

const container = document.getElementById("outlet")

if (container) {
  const root = createRoot(container)

  root.render(
      <Provider store={store}>
        <App />
      </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}