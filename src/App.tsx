import { Route, Routes } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import TodoPage from "./components/TodoPage";
export default function App() {
  /* LOGIN */

  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  );
}
