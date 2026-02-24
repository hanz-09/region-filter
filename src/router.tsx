import { createBrowserRouter } from "react-router-dom";
import RegionPage from "./pages/RegionPage.tsx";
import { regionLoader } from "./pages/RegionPage.loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegionPage />,
    loader: regionLoader,
  },
]);
