import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogOutIcon } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } finally {
      navigate("/", { replace: true, state: { reason: "logout" } });
    }
  };

  return (
    <nav className={`sticky top-0 mx-auto z-50 w-full bg-gray-800 backdrop-blur rounded-lg  max-w-3xl  `}>
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gray-200 p-5 flex items-center justify-center text-black">T</span>
          <span className="text-sm font-semibold tracking-tight">Todo App</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-5
        "
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
