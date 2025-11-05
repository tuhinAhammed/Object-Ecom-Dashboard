import { MdPayment } from "react-icons/md";
import { FaRecycle, FaRegHeart } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom";

function Dashboard() {
    const stats = [
        { 
            title: "Total Orders", 
            value: "24", 
            change: "+2 from last week", 
            icon: <MdPayment className="text-blue-600 text-xl" />,
            color: "blue"
        },
        { 
            title: "Pending Orders", 
            value: "5", 
            change: "Need attention", 
            icon: <FaRecycle className="text-yellow-600 text-xl" />,
            color: "yellow"
        },
        { 
            title: "Wallet Balance", 
            value: "$1,240", 
            change: "+$120 this month", 
            icon: <IoWallet className="text-green-600 text-xl" />,
            color: "green"
        },
        { 
            title: "Wishlist Items", 
            value: "12", 
            change: "3 items on sale", 
            icon: <FaRegHeart className="text-red-600 text-xl" />,
            color: "red"
        }
    ];

    const recentActivities = [
        { id: 1, action: "Order Placed", description: "Order #12345 confirmed", time: "2 hours ago" },
        { id: 2, action: "Payment Received", description: "Payment for Order #12345", time: "3 hours ago" },
        { id: 3, action: "Product Added", description: "Added to wishlist", time: "1 day ago" }
    ];

    const recentOrders = [
        { id: 1, orderId: "#12345", date: "Jan 15, 2024", amount: "$245.00", status: "Delivered" },
        { id: 2, orderId: "#12346", date: "Jan 14, 2024", amount: "$189.00", status: "Processing" },
    ];

    return (
        <div className="">
            {/* Welcome Section */}
            {/* <div className="bg-white rounded-lg shadow-sm ">
                <h1 className="text-2xl font-bold  mb-2">Welcome back, John! 👋</h1>
                <p className="text-gray-600">Here's what's happening with your store today.</p>
            </div> */}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-white rounded-lg shadow-sm p-6 border-l-4 border-${stat.color}-500`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                            <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                                {stat.icon}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link 
                            to="/dashboard/purchase-history"
                            className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
                        >
                            <MdPayment className="text-blue-600 text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium">View Orders</p>
                        </Link>
                        <Link 
                            to="/dashboard/wishlist"
                            className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
                        >
                            <FaRegHeart className="text-red-600 text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium">Wishlist</p>
                        </Link>
                        <Link 
                            to="/dashboard/my-wallet"
                            className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
                        >
                            <IoWallet className="text-green-600 text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium">Wallet</p>
                        </Link>
                        <Link 
                            to="/dashboard/support-ticket"
                            className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
                        >
                            <MdPayment className="text-purple-600 text-2xl mx-auto mb-2" />
                            <p className="text-sm font-medium">Support</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{activity.action}</p>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                    <Link 
                        to="/dashboard/purchase-history"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order.id} className="border-b border-gray-100">
                                    <td className="py-3 text-sm">{order.orderId}</td>
                                    <td className="py-3 text-sm text-gray-600">{order.date}</td>
                                    <td className="py-3 text-sm font-medium">{order.amount}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            order.status === "Delivered" 
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Recent Customets */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Customers</h3>
                    <Link 
                        to="/dashboard/purchase-history"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                                <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order.id} className="border-b border-gray-100">
                                    <td className="py-3 text-sm">{order.orderId}</td>
                                    <td className="py-3 text-sm text-gray-600">{order.date}</td>
                                    <td className="py-3 text-sm font-medium">{order.amount}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            order.status === "Delivered" 
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;