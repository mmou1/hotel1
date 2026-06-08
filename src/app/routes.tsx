import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import { RoomDetail } from "./pages/RoomDetail";
import { Services } from "./pages/Services";
import { Discover } from "./pages/Discover";
import { Contact } from "./pages/Contact";
import { Gallery } from "./pages/Gallery";
import { Reservation } from "./pages/Reservation";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "chambres", Component: Rooms },
      { path: "chambres/double-standard", Component: RoomDetail },
      { path: "chambres/superieure", Component: RoomDetail },
      { path: "chambres/terrasse", Component: RoomDetail },
      { path: "chambres/familiale", Component: RoomDetail },
      { path: "services", Component: Services },
      { path: "decouvrir", Component: Discover },
      { path: "contact", Component: Contact },
      { path: "galerie", Component: Gallery },
      { path: "reservation", Component: Reservation },
      { path: "*", Component: NotFound },
    ],
  },
]);
