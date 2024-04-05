import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  throw new Error("Root element not found");
}
