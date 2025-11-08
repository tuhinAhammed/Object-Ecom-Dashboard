import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    MdDashboard,
    MdPayment,
    MdContactSupport,
    MdOutlineAccountCircle,
    MdOutlineNotifications,
} from "react-icons/md";
import {
    FaArrowLeft,
    FaArrowRight,
    FaRecycle,
    FaRegHeart,
} from "react-icons/fa6";
import Container from "../Layout/Container/Container";
import {
    RiDashboardFill,
} from "react-icons/ri";
import { BiConversation } from "react-icons/bi";
import { IoDiamondSharp, IoWallet } from "react-icons/io5";
import { TiUserDelete } from "react-icons/ti";
import MinTitle from "../Layout/Title/MinTitle";
import LargeTitle from "../Layout/Title/LargeTitle";
import BreadcrumbPath from "../Layout/Breadcrumb/BreadcrumbPath";
import siteLogo from "../assets/Header/logo.png"
import { IoIosArrowForward, IoMdExpand } from "react-icons/io";
function DashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Start with full sidebar
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const toggleSubmenu = (index) => {
        // If already open, close it. Otherwise open this and close others
        setExpandedMenu(prev => (prev === index ? null : index));
    };
    // Mock data - replace with actual API calls
    const customerProfile = {
        first_name: "John Doe",
        image: null
    };
    const loading = false;

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = sidebarItems.findIndex(
            (item) => item.path === currentPath
        );
        setActiveMenu(activeItem);
    }, [location]);

    const handleMenuClick = (parentIndex, path, hasSubmenu, isSubmenu = false) => {
        if (hasSubmenu) return; // Parent with submenu is not clickable
        setActiveMenu(parentIndex);
        navigate(path);
        setMobileMenuOpen(false);

        // Only close the parent menu if this click is on a different parent
        if (!isSubmenu) {
            setExpandedMenu(null);
        }
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };
    const toggleSidebarAuto = () => {
        setSidebarCollapsed(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const sidebarItems = [
        {
            name: "Dashboard",
            icons: <MdDashboard />,
            path: "/dashboard",
        },
        {
            name: "Order",
            icons: <MdPayment />,
            path: "/dashboard/order",
        },
        {
            name: "Products",
            icons: <FaRecycle />,
            path: "",
            submenu: [
                { name: "Product Manage", path: "/dashboard/products" },
                { name: "Categories", path: "/dashboard/categories" },
            ]
        },
        {
            name: "Wishlist",
            icons: <FaRegHeart />,
            path: "/dashboard/wishlist",
        },
        {
            name: "Conversation",
            icons: <BiConversation />,
            path: "/dashboard/conversation",
        },
        {
            name: "My Wallet",
            icons: <IoWallet />,
            path: "/dashboard/my-wallet",
        },
        {
            name: "Earning Points",
            icons: <IoDiamondSharp />,
            path: "/dashboard/earning-points",
        },
        {
            name: "Support Ticket",
            icons: <MdContactSupport />,
            path: "/dashboard/support-ticket",
        },
        {
            name: "Manage Profile",
            icons: <MdOutlineAccountCircle />,
            path: "/dashboard/manage-profile",
        },
        {
            name: "Delete Account",
            icons: <TiUserDelete />,
            path: "/dashboard/delete-account",
        },
    ];

    const currentPageTitle = location.pathname.split("/").length === 3
        ? location.pathname.split("/")[2]
        : location.pathname.split("/")[1];

    return (
        <div className="min-h-screen ">
            <div className="py-6 md:py-0 lg:py-0">
                <Container>
                    {/* Header Section */}
                    <div className="flex items-center justify-between border-y border-borderColor gap-4 py-4">
                        <div className="">
                            {loading ? (
                                <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>
                            ) : (
                                <div className=" w-[120px] ">
                                    <img
                                        src={siteLogo || "/default-avatar.png"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <IoMdExpand />
                            <MdOutlineNotifications />
                        </div>
                    </div>

                    <div className="relative">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className="fixed top-4 left-4 p-3 text-xl bg-white rounded-lg shadow-lg text-blue-600 z-50 lg:hidden"
                        >
                            <RiDashboardFill />
                        </button>

                        <div className="flex gap-6">
                            {/* Desktop Sidebar */}
                            <div
                                className={`hidden lg:block bg-white rounded-lg shadow-sm transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-64"
                                    }`}
                            >
                                <div className="">
                                    {/* Profile Section */}
                                    <div className="profile pb-6 border-b border-gray-100 relative">
                                        {/* <div className="flex items-center gap-4">
                                            {loading ? (
                                                <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>
                                            ) : (
                                                <div className=" w-[120px] overflow-hidden border-2 border-gray-200">
                                                    <img
                                                        src={siteLogo || "/default-avatar.png"}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div> */}

                                        {/* Collapse Toggle Button */}
                                        <button
                                            onClick={toggleSidebar}
                                            className={`absolute -right-5 top-8 bg-blue-600 p-2 rounded-full text-white shadow-lg transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""
                                                }`}
                                        >
                                            <FaArrowLeft className="text-sm" />
                                        </button>
                                    </div>

                                    {/* Navigation Menu */}
                                    <nav className="px-4 py-6" style={{
                                        boxShadow: "0px 0px 25px  rgba(0,0,0,0.20)",
                                    }}>
                                        <ul className="grid grid-cols-1 gap-4">
                                            {sidebarItems.map((item, index) => {
                                                const isActive = activeMenu === index ||
                                                    (item.submenu && item.submenu.some(sub => sub.path === location.pathname));
                                                const isExpanded = expandedMenu === index;

                                                return (
                                                    <li key={index}>
                                                        <div className="flex items-center justify-between">
                                                            {/* Parent Button */}
                                                            <button
                                                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors duration-200
                        ${isActive
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-gray-700 bg-gray-200 hover:bg-blue-50 hover:text-blue-600"
                                                                    } ${sidebarCollapsed ? "justify-center" : "gap-3"}`}
                                                                onClick={() => {
                                                                    if (item.submenu) {
                                                                        // Parent has submenu → toggle it
                                                                        toggleSubmenu(index);
                                                                    } else {
                                                                        // Parent without submenu → navigate
                                                                        handleMenuClick(index, item.path, false);
                                                                    }
                                                                }}
                                                                title={sidebarCollapsed ? item.name : ""}
                                                            >
                                                                <span className="flex items-center gap-3">
                                                                    <span className="text-xl flex-shrink-0">{item.icons}</span>
                                                                    {!sidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
                                                                </span>

                                                                {/* Arrow */}
                                                                {item.submenu && !sidebarCollapsed && (
                                                                    <span
                                                                        className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                                                                        onClick={() => toggleSubmenu(index)}
                                                                    >
                                                                        <IoIosArrowForward />
                                                                    </span>
                                                                )}
                                                            </button>

                                                            {/* Submenu */}
                                                        </div>

                                                        {item.submenu && !sidebarCollapsed && (
                                                            <div
                                                                className={`overflow-hidden transition-all duration-300 ease-in-out
      ${isExpanded ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                                                            >
                                                                <ul className="pl-2 space-y-1">
                                                                    {item.submenu.map((sub, subIndex) => (
                                                                        <li key={subIndex}>
                                                                            <button
                                                                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200
              ${location.pathname === sub.path
                ? "bg-blue-600 text-white"
                : "text-gray-700 bg-gray-200 hover:bg-blue-50 hover:text-blue-600"
                                                                                    }`}
                                                                                onClick={() => handleMenuClick(index, sub.path, false, true)}
                                                                            >
                                                                                <span className="flex items-center gap-3">
                                                                                <span className="text-xl flex-shrink-0">{item.icons}</span>
                                                                                <span className="font-medium text-sm">{sub.name}</span>
                                                                                </span>
                                                                            </button>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>

                                    </nav>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 transition-all duration-300 " >
                                {/* <div className="flex items-center  justify-between px-6 py-4">
                                    <LargeTitle
                                        className="font-semibold capitalize"
                                        text={currentPageTitle}
                                    />
                                    <BreadcrumbPath className="hidden lg:block" />
                                </div> */}
                                <div className=" w-full py-6" >
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={toggleMobileMenu}
                        ></div>
                    )}

                    {/* Mobile Sidebar */}
                    <div
                        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 lg:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Mobile Profile Section */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-4">
                                {loading ? (
                                    <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                        <img
                                            src={customerProfile?.image || "/default-avatar.png"}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    {loading ? (
                                        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                                    ) : (
                                        <MinTitle
                                            className="font-semibold"
                                            text={customerProfile?.first_name}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
                            <ul className="space-y-2">
                                {sidebarItems.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors duration-200 ${activeMenu === index
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                }`}
                                            onClick={() => handleMenuClick(index, item.path)}
                                        >
                                            <span className="text-xl flex-shrink-0">
                                                {item.icons}
                                            </span>
                                            <span className="font-medium text-sm">
                                                {item.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default DashboardPage;