import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

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
    <nav className="sticky top-5 z-50 w-full ">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="mt-3 rounded-xl shadow-lg bg-white/90 backdrop-blur-2xl">
          <div className="flex h-14 items-center justify-between px-4">
            {/* Brand */}
            <Link to="/todo" className="flex items-center gap-2 group">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-violet-700 font-bold">
                T
              </span>
              <span className="text-sm font-semibold tracking-tight text-black group-hover:text-violet-500">
                Todo App
              </span>
            </Link>

            {/* Actions */}
            <button
              onClick={handleLogout}
              className="text-black flex items-center gap-5 bg-gray-400/50 rounded-lg px-5 py-2 cursor-pointer"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
