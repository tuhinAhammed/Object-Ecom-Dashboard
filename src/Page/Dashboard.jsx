import { MdPayment, MdPeopleAlt } from "react-icons/md";
import { FaRecycle, FaRegHeart } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { categoryListApi, currency_symbol, orderList, productList, subscriberListApi } from "../Api/Api";
import { useSelector } from "react-redux";
import { FaBoxOpen, FaCalendarDay } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import OrdersAnalytics from "../Components/Dashboard/OrderAnlytics";

function Dashboard() {
    const [orderData, setOrderData] = useState([])
    const [productData, setProductData] = useState([])
    const [subscriberData, setSubscriberData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    console.log(orderData);
    const token = useSelector((state) => state?.userData?.token)
    const [apiLoading, setApiLoading] = useState(false)
    // Today Order
    const todayOrder = orderData?.filter(order => {
        const orderDate = new Date(order?.order_date);
        const today = new Date();
        return (
            orderDate.getFullYear() === today.getFullYear() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getDate() === today.getDate()
        );
    });
    const stats = [
        {
            title: "Total Orders",
            value: orderData?.length || 0,
            change: "All time orders",
            icon: <MdPayment size={24} color="#3B82F6" />, // Blue
            color: "#3B82F6"
        },
        {
            title: "Today's Orders",
            value: todayOrder?.length || 0,
            change: "Last 24 hours",
            icon: <FaCalendarDay size={24} color="#FACC15" />, // Yellow
            color: "#FACC15"
        },
        {
            title: "Products",
            value: productData?.length || 0,
            change: "Active listings",
            icon: <FaBoxOpen size={24} color="#22C55E" />, // Green
            color: "#22C55E"
        },
        {
            title: "Customers",
            value: subscriberData?.length || 0,
            change: "Registered users",
            icon: <MdPeopleAlt size={24} color="#EF4444" />, // Red
            color: "#EF4444"
        }
    ];

    const recentActivities = [
        { id: 1, action: "Order Placed", description: "Order #12345 confirmed", time: "2 hours ago" },
        { id: 2, action: "Payment Received", description: "Payment for Order #12345", time: "3 hours ago" },
        { id: 3, action: "Product Added", description: "Added to wishlist", time: "1 day ago" }
    ];

    const recentOrders = orderData
        .slice() // create a shallow copy so we don't mutate original array
        .sort((a, b) => new Date(b.order_date) - new Date(a.order_date)) // newest first
        .slice(0, 5); // take first 5

    useEffect(() => {
        const fetchMultiApi = async () => {
            try {
                setApiLoading(true);

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const [orderRes, productRes, subscriberRes, categoryRes] = await Promise.all([
                    axios.get(orderList, config),
                    axios.get(productList, config),
                    axios.get(subscriberListApi, config),
                    axios.get(categoryListApi, config),
                ]);

                setOrderData(orderRes.data?.data);
                setProductData(productRes.data?.data);
                setSubscriberData(subscriberRes.data?.data);
                setCategoryData(categoryRes.data?.data);
            } catch (error) {
                console.error("Error fetching APIs:", error);
            } finally {
                setApiLoading(false);
            }
        };
        fetchMultiApi();
    }, []);
    console.log(categoryData);
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
                    <div
                        key={index}
                        className="rounded-lg shadow-md p-6 border-l-4"
                        style={{ borderColor: stat.color, boxShadow: "0px 0px 25px  rgba(0,0,0,0.20)" }}

                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                {
                                    apiLoading ?
                                        <div className="w-18 h-6 my-1 rounded-md bg-skeletonLoading"></div>
                                        :
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                }
                            </div>
                            <div
                                className="p-3 rounded-full !bg-opacity-[0.2]"
                                style={{ backgroundColor: `${stat.color}50` }} // 20% opacity
                            >
                                {stat.icon}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Make a graft depend on order (order date) */}
            <OrdersAnalytics orderData={orderData} />
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
                                    <td className="py-3 text-sm">{order.id}</td>
                                    <td className="py-3 text-sm text-gray-600">{new Date(order.order_date).toLocaleString()}</td>
                                    <td className="py-3 text-sm font-medium">{currency_symbol}{order.total}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === "Delivered"
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
            {/* <div className="bg-white rounded-lg shadow-sm p-6">
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
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === "Delivered"
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
            </div> */}
        </div>
    );
}

export default Dashboard;