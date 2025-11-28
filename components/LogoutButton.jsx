"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/api/auth/logout-kc", // redirect ke endpoint custom
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  );
}
