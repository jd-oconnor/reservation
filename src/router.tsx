import { createBrowserRouter } from "react-router-dom"
import { RootLayout } from "./layouts"
import { ClientHomePage, ErrorPage, LoginPage, ProviderHomePage } from "./pages"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "provider",
        children: [
          {
            path: "home",
            element: <ProviderHomePage />,
          },
        ],
      },
      {
        path: "/home",
        element: <ClientHomePage />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
])
