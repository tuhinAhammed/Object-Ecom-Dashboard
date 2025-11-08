import React, { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const OrdersAnalytics = ({ orderData }) => {
  // Process order data for analytics
  const { revenueData, statusData } = useMemo(() => {
    if (!orderData || !orderData.length) {
      return { revenueData: null, statusData: null };
    }

    // Process monthly revenue data
    const monthlyOrders = {};
    const monthlyRevenue = {}; // for tooltip

    orderData.forEach(order => {
      const date = new Date(order.order_date);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
      if (!monthlyOrders[monthYear]) monthlyOrders[monthYear] = 0;
      monthlyOrders[monthYear] += 1; // count orders
    
      if (!monthlyRevenue[monthYear]) monthlyRevenue[monthYear] = 0;
      monthlyRevenue[monthYear] += order.total || 0; // sum revenue for tooltip
    });
    
    // Sort months and prepare chart data
    const sortedMonths = Object.keys(monthlyOrders).sort();
    const revenueLabels = sortedMonths.map(month => {
      const [year, monthNum] = month.split('-');
      return new Date(year, monthNum - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });
    const ordersValues = sortedMonths.map(month => monthlyOrders[month]);
    const revenueValues = sortedMonths.map(month => monthlyRevenue[month]);

    // Process order status distribution
    const statusCounts = {};
    orderData.forEach(order => {
      const status = order.status || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return {
      revenueData: {
        labels: revenueLabels,
        datasets: [
          {
            label: 'Orders Placed',
            data: ordersValues,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            revenue: revenueValues, // <-- store revenue per month for tooltip
          },
        ],
      },
      statusData: {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',    // blue for pending
              'rgba(16, 185, 129, 0.8)',    // green for completed
              'rgba(245, 158, 11, 0.8)',    // yellow for processing
              'rgba(239, 68, 68, 0.8)',     // red for cancelled
              'rgba(139, 92, 246, 0.8)',    // purple for shipped
              'rgba(156, 163, 175, 0.8)',   // gray for unknown
            ],
            borderWidth: 0,
          },
        ],
      }
    };
  }, [orderData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // removes the legend entirely
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Orders: ${context.parsed.y}`;
          },
        },
      },
    },
    animation: { duration: 2000, easing: 'easeOutQuart' },
    elements: { line: { tension: 0.4 }, point: { radius: 4 } },
  };
  
  
  const [raceData, setRaceData] = useState({
    labels: [],
    datasets: [{ label: 'Orders Placed', data: [], borderColor: 'rgb(59,130,246)', fill: true }],
  });
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < revenueData?.labels?.length) {
        setRaceData({
          labels: revenueData.labels.slice(0, i + 1),
          datasets: [{
            ...revenueData.datasets[0],
            data: revenueData.datasets[0].data.slice(0, i + 1),
          }],
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300); // every 300ms add a new point
  
    return () => clearInterval(interval);
  }, [revenueData]);

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0; // use context.raw for doughnut value
            return `${label}: ${value} orders`;
          },
        },
      },
    },
  };

  if (!orderData || !orderData.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <i className="fas fa-chart-bar text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-500">No order data available</h3>
          <p className="text-gray-400">Analytics will appear here when orders are available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 pt-6">
        {/* Revenue Trend Chart */}
        <div className="bg-gray-50 rounded-lg p-4 lg:col-span-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Revenue Trend</h3>
            <div className="text-sm text-gray-500">
              Total: ৳{orderData.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
            </div>
          </div>
          <div className="h-64">
          <Line data={raceData} options={chartOptions} />
          </div>
        </div>

        {/* Order Status Distribution Chart */}
        <div className="bg-gray-50 rounded-lg p-4 lg:col-span-4">
          <div className="flex justify-between items-center mb-4">
            {/* <h3 className="text-lg font-medium text-gray-800">Order Status Distribution</h3> */}
            {/* <div className="text-sm text-gray-500">
              {Object.values(statusData?.datasets[0]?.data || []).reduce((a, b) => a + b, 0)} orders
            </div> */}
          </div>
          <div className="h-64">
            <Doughnut data={statusData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Data Summary */}
      {/* <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-500">Total Orders</div>
            <div className="text-lg font-semibold text-gray-800">{orderData.length}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-lg font-semibold text-gray-800">
              ৳{orderData.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Pending Orders</div>
            <div className="text-lg font-semibold text-yellow-600">
              {orderData.filter(order => order.status === 'pending').length}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Avg. Order Value</div>
            <div className="text-lg font-semibold text-gray-800">
              ৳{Math.round(orderData.reduce((sum, order) => sum + (order.total || 0), 0) / orderData.length)}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default OrdersAnalytics;