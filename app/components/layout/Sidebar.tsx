"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const cn = (...classes: (string | undefined | boolean)[]) => classes.filter(Boolean).join(" ");

const navItems = [
  { name: "Dashboard", icon: "/assets/icons/dashboard.svg", href: "/dashboard" },
  { name: "Transactions", icon: "/assets/icons/transactions.svg", href: "/dashboard/transactions" },
  { name: "Invoices", icon: "/assets/icons/invoices.svg", href: "/dashboard/invoices" },
  { name: "My Wallets", icon: "/assets/icons/MyWallets.svg", href: "/dashboard/wallets" },
  { name: "Settings", icon: "/assets/icons/settings.svg", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col justify-between transition-transform duration-300 z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static"
        )}
      >
        <div>
          {/* Logo aligned to the right */}
          <div className="px-6 py-8 justify-end flex lg:justify-start">
            <Image src="/assets/images/Logo.svg" alt="Logo" width={100} height={30} />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-5">
            {navItems.map(({ name, icon, href }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-lime-400 text-black"
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setIsOpen(false)} // close on mobile click
              >
                <Image src={icon} alt={name} width={20} height={20} />
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col px-4 py-4 gap-1 border-t border-gray-100">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <Image src="/assets/icons/help.svg" alt="Help" width={20} height={20} />
            Help
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <Image src="/assets/icons/logout.svg" alt="Logout" width={20} height={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile toggle button (now toggles open/close) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-lime-400 text-white rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)} // toggle instead of only open
      >
        {isOpen ? "Close" : "Menu"}
      </button>
    </>
  );
}
