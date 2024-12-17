import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/index";
import ContextApp from "./modules/contextApp/ContextApp.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ContextApp.Provider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextApp.Provider>
  </BrowserRouter>
);
