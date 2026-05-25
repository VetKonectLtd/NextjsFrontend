import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, ROLE_NAV_ACCESS } from "./data";
import Link from "next/link";
import Image from "next/image";
import { useAuthService } from "@/services/authService";
import { User } from "@/app/assets/icons";
import { X } from "lucide-react";
import { useEffect } from "react";

const DEFAULT_AVATAR = User;

export function SidebarMobile({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const { useCurrentUser } = useAuthService();

  const { data: user, isLoading } = useCurrentUser(true);
  const currentUser = (user as any)?.profile;

  const userRole = currentUser?.role;

  const allowedIds = ROLE_NAV_ACCESS[userRole] || ROLE_NAV_ACCESS["basic_user"];

  const filteredNav = navItems.filter((item) => allowedIds.includes(item.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 left-0 z-50 w-full h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            {/* Header */}
            <div className="flex items-right justify-end px-5 pt-5 pb-2">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                <X size={24} />
              </button>
            </div>
            {/* Nav Items */}
            <nav className="flex-1 px-5 py-2 overflow-y-auto">
              {filteredNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href + "/") &&
                    item.href !== "/dashboard") ||
                  (pathname === "/dashboard" && item.href === "/dashboard");
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-4 transition text-base font-medium
										${isActive ? "border border-green-500 bg-green-50" : "border border-transparent hover:border-green-500"}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            {/* User Profile */}
            <div className="flex items-center gap-2 px-5 py-4 border-t">
              <Image
                src={
                  currentUser?.user?.profile?.profile_image_url ||
                  DEFAULT_AVATAR
                }
                alt={"User"}
                width={32}
                height={32}
                className="rounded-full h-10 w-10 object-cover"
              />
              {currentUser.role == "basic_user" && (
                <span className="text-xs text-gray-500 capitalize">
                  {userRole || "basic_user"}
                </span>
              )}
              {currentUser.role != "basic_user" && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {currentUser?.user?.first_name}{" "}
                    {currentUser?.user?.last_name}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {userRole}
                  </span>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
