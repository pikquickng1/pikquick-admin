"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, ChevronDown } from "lucide-react";

interface MenuItem {
    id: string;
    label: string;
    icon: string;
    href?: string;
    children?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: "/sidebar-icons/home.svg",
        href: "/dashboard",
    },
    {
        id: "users",
        label: "Users",
        icon: "/sidebar-icons/users.svg",
        children: [
            { label: "Requesters", href: "/dashboard/users/requesters" },
            { label: "Runners", href: "/dashboard/users/runners" },
        ],
    },
    {
        id: "tasks",
        label: "Tasks",
        icon: "/sidebar-icons/tasks.svg",
        href: "/dashboard/tasks",
    },
    {
        id: "finance",
        label: "Finance",
        icon: "/sidebar-icons/finance.svg",
        children: [
            { label: "Transaction Overview", href: "/dashboard/finance/transactions" },
            { label: "Payout Requests", href: "/dashboard/finance/payouts" },
            { label: "Wallets Overview", href: "/dashboard/finance/wallets" },
            { label: "Revenue Reports", href: "/dashboard/finance/revenue-reports" },
        ],
    },
    {
        id: "referral",
        label: "Referral Management",
        icon: "/sidebar-icons/ref.svg",
        href: "/dashboard/referral",
    },
    {
        id: "kyc",
        label: "KYC Verification",
        icon: "/sidebar-icons/kyc.svg",
        href: "/dashboard/kyc",
    },
    {
        id: "compliance",
        label: "Compliance Management",
        icon: "/sidebar-icons/com.svg",
        href: "/dashboard/compliance",
    },
    {
        id: "disputes",
        label: "Disputes & Support",
        icon: "/sidebar-icons/headset.svg",
        href: "/dashboard/disputes",
    },
    {
        id: "analytics",
        label: "Analytics & Insights",
        icon: "/sidebar-icons/analytics.svg",
        href: "/dashboard/analytics",
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>(["users", "finance"]);

    const toggleExpand = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isActive = (href?: string) => {
        if (!href) return false;
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <aside className="w-70 bg-white border-r border-[#E1E1E1] flex flex-col">
            {/* Logo */}
            <div className="p-6 border-neutral-200">
                <Link href="/dashboard" className="flex justify-center gap-3">
                    <Image 
                        src="/pikquick-logo.svg" 
                        alt="PikQuick Logo" 
                        width={140} 
                        height={40}
                        className="h-10 w-auto"
                    />
                </Link>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {menuItems.map((item) => (
                    <div key={item.id} className="mb-1">
                        {item.children ? (
                            <>
                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors"
                                    style={{ color: '#070D17' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Image src={item.icon} alt={item.label} width={20} height={20} className="w-5 h-5" />
                                        <span className="text-[15px] font-normal">{item.label}</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${expandedItems.includes(item.id) ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedItems.includes(item.id) && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`block px-3 py-2 rounded-lg text-[15px] font-normal transition-colors ${isActive(child.href)
                                                    ? "text-primary-600 bg-primary-50"
                                                    : "hover:bg-neutral-50"
                                                    }`}
                                                style={!isActive(child.href) ? { color: '#070D17' } : undefined}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.href!}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive(item.href)
                                    ? "bg-primary-500 text-white"
                                    : "hover:bg-neutral-50"
                                    }`}
                                style={!isActive(item.href) ? { color: '#070D17' } : undefined}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    className={`w-5 h-5 ${isActive(item.href) ? "brightness-0 invert" : ""}`}
                                />
                                <span className="text-[15px] font-normal">{item.label}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-neutral-200 p-3 space-y-1">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors"
                    style={{ color: '#070D17' }}
                >
                    <Image src="/sidebar-icons/settings.svg" alt="Settings" width={20} height={20} className="w-5 h-5" />
                    <span className="text-[15px] font-normal">Settings</span>
                </Link>
                <Link
                    href="/dashboard/activity"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors"
                    style={{ color: '#070D17' }}
                >
                    <Image src="/sidebar-icons/icon-park-outline_log.svg" alt="Activity Log" width={20} height={20} className="w-5 h-5" />
                    <span className="text-[15px] font-normal">Activity Log</span>
                </Link>

                {/* User Profile */}
                <div className="mt-3 pt-3 border-t border-neutral-200">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="/avatar-placeholder.jpg" alt="User Avatar" />
                            <AvatarFallback className="bg-neutral-800 text-white">TN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                            <p className="text-[15px] font-medium text-text-primary">Text Name</p>
                            <p className="text-xs text-text-secondary">example@email.com</p>
                        </div>
                        <LogOut className="w-5 h-5 text-text-primary" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
