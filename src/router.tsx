import { createBrowserRouter } from "react-router-dom";
import RegionPage, { regionLoader } from "./pages/RegionPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegionPage />,
    loader: regionLoader,
  },
]);
