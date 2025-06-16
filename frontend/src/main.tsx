import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Notifications position="bottom-right" zIndex={2077} />
    <App />
  </MantineProvider>
);
