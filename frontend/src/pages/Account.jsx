import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>

      <div className="border p-6 rounded">
        <p className="mb-2">
          <strong>Name:</strong> {user?.name}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="mb-4">
          <strong>Role:</strong> User
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded flex gap-2 items-center"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
