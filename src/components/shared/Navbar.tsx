"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VetKonnectLogo } from "@/app/assets/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	XMarkIcon,
	Bars3Icon,
	UserIcon,
	InformationCircleIcon,
	CalculatorIcon,
	HeartIcon,
	DocumentTextIcon,
	ChatBubbleLeftRightIcon,
	LanguageIcon,
	PhoneIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import { Notification, MessageNav } from "@/app/assets/icons";
import Cookies from "js-cookie";
import { useAuthService } from "@/services/authService";
import {
	History,
	HistoryIcon,
	LogOut,
	MessageSquare,
	UserRoundCog,
} from "lucide-react";
import { useActivitiesService } from "@/services/activitiesService";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { useLogout } = useAuthService();
	const logoutMutation = useLogout();
	const [token, setToken] = useState<string | undefined>(
		Cookies.get("auth-token"),
	);
	const { useGetNotification } = useActivitiesService();
	const getNotification = useGetNotification(true);

	const unreadCount = (getNotification?.data as any)?.totalNotification || 0;

	const pathname = usePathname();

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const toggleAccountDropdown = () => {
		setIsAccountDropdownOpen(!isAccountDropdownOpen);
	};

	// Helper function to check if a link is active
	const isActiveLink = (href: string) => {
		return pathname === href;
	};

	// Helper function to get link classes based on active state
	const getLinkClasses = (href: string) => {
		const baseClasses = "px-3 py-2 text-sm font-medium transition-colors";
		const activeClasses = "text-green-600 underline";
		const inactiveClasses = "text-gray-800 hover:text-green-600";

		return `${baseClasses} ${isActiveLink(href) ? activeClasses : inactiveClasses}`;
	};

	// Helper function to get mobile link classes based on active state
	const getMobileLinkClasses = (href: string) => {
		const baseClasses =
			"flex items-center px-4 py-4 rounded-2xl transition-colors";
		const activeClasses = "text-green-600 underline";
		const inactiveClasses =
			"text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link";

		return `${baseClasses} ${isActiveLink(href) ? activeClasses : inactiveClasses}`;
	};

	const closeAccountDropdown = () => {
		setIsAccountDropdownOpen(false);
	};

	useEffect(() => {
		const currentToken = Cookies.get("auth-token");
		setIsAuthenticated(!!currentToken);
		setToken(currentToken);

		const interval = setInterval(() => {
			const newToken = Cookies.get("auth-token");
			if (newToken !== token) {
				setToken(newToken);
				setIsAuthenticated(!!newToken);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [token]);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const handleLogout = () => {
		logoutMutation.mutate(undefined, {
			onSuccess: () => {
				window.location.reload();
			},
		});
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
				isScrolled
					? "shadow-md bg-gradient-to-r from-[#B2F6B9] via-[#FFE1A6] to-[#E9F6B2]"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-20 items-center w-full max-w-full overflow-hidden">
					{/* Logo */}
					<Link href="/" className="flex-shrink-0 min-w-0">
						<div className="h-12 w-auto">
							<Image
								src={VetKonnectLogo}
								alt="VetKonnect Logo"
								width={180}
								height={50}
								className="h-full w-auto max-w-[120px] sm:max-w-[180px]"
								priority
							/>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/about"
							className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
						>
							About Us
						</Link>
						<Link
							href="/dashboard/feed-calculator"
							className={getLinkClasses("/dashboard/feed-calculator")}
						>
							Feed Calculator
						</Link>
						<Link
							href="/dashboard/disease-predictor"
							className={getLinkClasses("/dashboard/disease-predictor")}
						>
							Disease Predictor
						</Link>
						<Link
							href="/dashboard/blog"
							className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
						>
							Blog
						</Link>
						<Link
							href="/dashboard/chat-forum"
							className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
						>
							Chat Forum
						</Link>
						<Link
							href="/initiatives"
							className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
						>
							Initiatives
						</Link>
					</div>

					{/* Right-side Icons */}
					<div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-shrink-0">
						{/* Notifications */}
						<div className="hidden md:block relative">
							{isAuthenticated && (
								<Link href="/dashboard/notifications">
									<button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-green-50 relative">
										<Image
											src={Notification}
											alt="Notifications"
											width={20}
											height={20}
										/>
										{/* Notification Badge */}
										{unreadCount < 1 && (
											<span className="absolute -top-1 -right-1 w-6 h-6 p-2 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
												{unreadCount}
											</span>
										)}
									</button>
								</Link>
							)}
						</div>
						{isAuthenticated && (
							<Link
								className="hidden md:block relative"
								href="/dashboard/orders"
							>
								<button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-green-50 relative">
									<HistoryIcon className="w-5 h-5" />
								</button>
							</Link>
						)}

						{/* Messages */}
						{isAuthenticated && (
							<Link
								href="/dashboard/messages"
								className="hidden md:block relative"
							>
								<button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-green-50">
									<Image
										src={MessageNav}
										alt="Messages"
										width={20}
										height={20}
									/>
								</button>
							</Link>
						)}

						{/* Language Selector */}
						<div className="flex items-center cursor-pointer transition-colors text-gray-800 hover:text-green-600">
							<span className="text-sm font-medium">EN</span>
							<svg
								className="w-4 h-4 ml-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>

						{/* Menu Button (visible on mobile) */}
						<button
							onClick={toggleMobileMenu}
							className="md:hidden p-2 transition-colors text-gray-800 hover:text-green-600"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<XMarkIcon className="w-5 h-5" />
							) : (
								<Bars3Icon className="w-5 h-5" />
							)}
						</button>

						{/* User Profile */}
						<div className="hidden md:block relative">
							<button
								onClick={toggleAccountDropdown}
								className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-green-50"
								aria-label="Account menu"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</button>

							{/* Account Dropdown Menu */}
							<AnimatePresence>
								{isAccountDropdownOpen && (
									<>
										{/* Backdrop */}
										<div
											className="fixed inset-0 z-[9998]"
											onClick={closeAccountDropdown}
										/>

										{/* Dropdown */}
										<motion.div
											initial={{ opacity: 0, y: -10, scale: 0.95 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -10, scale: 0.95 }}
											transition={{ duration: 0.2, ease: "easeOut" }}
											className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-[9999] overflow-hidden"
											style={{ position: "fixed", right: "1rem", top: "4rem" }}
										>
											<div className="p-4 space-y-2">
												{!isAuthenticated ? (
													<>
														{/* Login */}
														<Link
															href="/login"
															onClick={closeAccountDropdown}
															className="flex items-center px-4 py-3 rounded-xl text-gray-700 bg-gray-50 border border-gray-200 shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200"
														>
															<UserIcon className="w-5 h-5 mr-3" />
															<span className="text-sm font-medium">Login</span>
														</Link>

														{/* Signup */}
														<Link
															href="/signup"
															onClick={closeAccountDropdown}
															className="flex items-center px-4 py-3 rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md transition-all duration-200"
														>
															<UserIcon className="w-5 h-5 mr-3" />
															<span className="text-sm font-medium">
																Sign Up
															</span>
														</Link>
													</>
												) : (
													<>
														{/* Profile */}
														<Link
															href="/dashboard/account"
															onClick={closeAccountDropdown}
															className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
														>
															<UserRoundCog className="w-5 h-5 mr-3" />
															<span className="text-sm font-medium">
																My Account
															</span>
														</Link>

														<button className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200">
															<MessageSquare className="w-5 h-5 mr-3" />
															<span className="text-sm font-medium">
																Language Option
															</span>
														</button>

														{/* Logout */}
														<button
															onClick={handleLogout}
															className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
														>
															<LogOut className="w-5 h-5 mr-3" />
															<span className="text-sm font-medium">
																Logout
															</span>
														</button>
													</>
												)}

												{/* Divider */}
												{/* <div className="border-t border-gray-200 my-2"></div> */}

												{/* Customer Support */}
												<Link
													href="/customer-support"
													onClick={closeAccountDropdown}
													className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:border hover:border-gray-200 transition-all duration-200"
												>
													<PhoneIcon className="w-5 h-5 mr-3" />
													<span className="text-sm font-medium">
														Customer Support
													</span>
												</Link>
											</div>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Sidebar Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
						onClick={closeMobileMenu}
					/>
				)}
			</AnimatePresence>

			{/* Mobile Sidebar */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "tween", duration: 0.3 }}
						className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 md:hidden overflow-y-auto"
					>
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<Link href="/" className="flex items-center">
								<Image
									src={VetKonnectLogo}
									alt="VetKonnect Logo"
									width={180}
									height={50}
									className="h-full w-auto max-w-[120px] sm:max-w-[180px]"
									priority
								/>
							</Link>
							<button
								onClick={closeMobileMenu}
								className="p-2 rounded-full hover:bg-gray-100"
								aria-label="Close menu"
							>
								<XMarkIcon className="w-6 h-6 text-gray-600" />
							</button>
						</div>

						<nav className="p-6 space-y-2">
							{/* Login/Signup */}

							{!isAuthenticated && (
								<Link
									href="/login"
									onClick={closeMobileMenu}
									className="flex items-center px-4 py-4 rounded-2xl text-gray-700 bg-gray-150 border border-gray-225 shadow-active-link transition-colors"
								>
									<UserIcon className="w-6 h-6 mr-4" />
									<span className="text-base font-medium">Login / Signup</span>
								</Link>
							)}

							{/* Home */}
							<Link
								href="/"
								onClick={closeMobileMenu}
								className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
							>
								<HomeIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Home</span>
							</Link>

							{/* About Us */}
							<Link
								href="/about"
								onClick={closeMobileMenu}
								className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
							>
								<InformationCircleIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">About Us</span>
							</Link>

							{/* Feed Calculator */}
							<Link
								href="/dashboard/feed-calculator"
								onClick={closeMobileMenu}
								className={getMobileLinkClasses("/dashboard/feed-calculator")}
							>
								<CalculatorIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Feed Calculator</span>
							</Link>

							{/* Disease Predictor */}
							<Link
								href="/dashboard/disease-predictor"
								onClick={closeMobileMenu}
								className={getMobileLinkClasses("/dashboard/disease-predictor")}
							>
								<HeartIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Disease Predictor</span>
							</Link>

							{/* Blog */}
							<Link
								href="/dashboard/blog"
								onClick={closeMobileMenu}
								className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
							>
								<DocumentTextIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Blog</span>
							</Link>

							{/* Chat Forum */}
							<Link
								href="/dashboard/chat-forum"
								onClick={closeMobileMenu}
								className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
							>
								<ChatBubbleLeftRightIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Chat Forum</span>
							</Link>

							<Link
								href="/initiatives"
								onClick={closeMobileMenu}
								className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
							>
								<ChatBubbleLeftRightIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Initiatives</span>
							</Link>

							{/* Language Option */}
							<div className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors cursor-pointer">
								<LanguageIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Language Option</span>
							</div>

							{/* Customer Support */}
							<Link
								href="/customer-support"
								onClick={closeMobileMenu}
								className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
							>
								<PhoneIcon className="w-6 h-6 mr-4" />
								<span className="text-base font-medium">Customer Support</span>
							</Link>

							{isAuthenticated && (
								<button
									onClick={() => {
										handleLogout();
										closeMobileMenu();
									}}
									className="flex items-center px-4 py-4 w-full rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
								>
									<UserIcon className="w-6 h-6 mr-4" />
									<span className="text-base font-medium">Logout</span>
								</button>
							)}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
