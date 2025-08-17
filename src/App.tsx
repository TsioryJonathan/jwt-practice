import { Route, Routes } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import TodoPage from "./components/TodoPage";
export default function App() {
  return (
    <div className="min-h-screen -mt-3">
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </div>
  );
}
