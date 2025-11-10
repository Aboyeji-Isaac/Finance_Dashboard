"use client";

import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const pageTitle = pathname.split("/").pop() || "Dashboard";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 capitalize">{pageTitle}</h2>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="Dropdown Icon"
        />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
        <Image
          src="/assets/icons/notification-bell.svg"
          width={24}
          height={24}
          alt="Dropdown Icon"
        />

        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/user.jpg"
            alt="User"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">Mahfuzul Nabil</span>
        </div>
      </div>
    </header>
  );
}
