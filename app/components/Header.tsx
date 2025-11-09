"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CreditCard, Settings, LogOut, HelpCircle } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "My Wallets", href: "/wallets", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="w-72 bg-white border-r min-h-screen flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold">M</div>
          <span className="text-lg font-semibold">Maglo.</span>
        </div>

        <nav className="px-2 py-4 space-y-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.name}
                href={l.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  active ? "bg-lime-300 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <l.icon size={18} />
                {l.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 py-6 text-sm text-slate-600 space-y-2">
        <button className="flex items-center gap-2 w-full hover:text-slate-900"><HelpCircle size={16}/> Help</button>
        <button className="flex items-center gap-2 w-full hover:text-slate-900"><LogOut size={16}/> Logout</button>
      </div>
    </aside>
  );
}
