import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout";
import { routes } from "./routes";

const App = () => (
  <AppLayout>
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  </AppLayout>
);

export default App;
