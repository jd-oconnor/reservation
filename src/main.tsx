import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ErrorBoundary } from "./components"
import "./index.css"
import { ErrorPage } from "./pages"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorPage}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
