"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import useAuth from "../../lib/useAuth";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  // Detect if route is the create invoice page
  const isCreatingInvoice = pathname === "/invoice/create";

  // Get invoice ID from URL
  const invoiceId = searchParams.get("invoiceId");

  // Final dynamic page title
  const pageTitle = isCreatingInvoice
    ? `New Invoice: ${invoiceId}`
    : pathname.split("/").pop() || "Dashboard";

  const getInitials = (name: string = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 capitalize">
        {pageTitle}
      </h2>

      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Image src="/assets/icons/search.svg" width={24} height={24} alt="Search" />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Image
            src="/assets/icons/notification-bell.svg"
            width={24}
            height={24}
            alt="Notifications"
          />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-lime-400 flex items-center justify-center text-black font-semibold">
              {getInitials(user?.name)}
            </div>

            <span className="text-sm font-medium text-gray-700">
              {user?.name || "User"}
            </span>

            <Image
              src="/assets/icons/Dropdown.svg"
              width={20}
              height={20}
              alt="Dropdown"
              className={`${open ? "rotate-180" : ""} transition`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Profile Settings
              </button>

              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Change Password
              </button>

              <hr className="my-1" />

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
