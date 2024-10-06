import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../apis/userAPI";

export default function HomePage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logoutUser();
    logout();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
