import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [activeTab, setActiveTab] = useState('overview');
    const [notifications, setNotifications] = useState(3);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBookings: 145,
        activeServices: 6,
        totalRevenue: 24850,
        customerSatisfaction: 4.8
    });

    const [recentBookings] = useState([
        { id: 1, service: 'House Cleaning', customer: 'Sarah Johnson', date: '2024-08-22', status: 'Completed', amount: 120 },
        { id: 2, service: 'Plumbing Repair', customer: 'Mike Chen', date: '2024-08-21', status: 'In Progress', amount: 85 },
        { id: 3, service: 'Electrical Work', customer: 'Emily Rodriguez', date: '2024-08-20', status: 'Scheduled', amount: 200 },
        { id: 4, service: 'Painting Service', customer: 'John Smith', date: '2024-08-19', status: 'Completed', amount: 350 }
    ]);
    const [services] = useState([
        { name: 'House Cleaning', bookings: 45, revenue: 5400, rating: 4.9 },
        { name: 'Plumbing', bookings: 32, revenue: 4800, rating: 4.7 },
        { name: 'Electrical Work', bookings: 28, revenue: 6200, rating: 4.8 },
        { name: 'Painting', bookings: 22, revenue: 4850, rating: 4.6 },
        { name: 'Landscaping', bookings: 18, revenue: 3600, rating: 4.5 }
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:5000/api/auth', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                const userData = res.data;
                setUser(userData);

                // Check if user is admin (assuming role is stored in user data)
                if (userData.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    // Redirect non-admin users to unauthorized page or home
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error('Authentication error:', err);
                localStorage.removeItem('token');
                navigate('/login');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#10b981';
            case 'In Progress': return '#f59e0b';
            case 'Scheduled': return '#3b82f6';
            default: return '#6b7280';
        }
    };

    const StatCard = ({ title, value, icon, trend, trendValue }) => (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            transition: 'transform 0.3s ease'
        }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>{title}</p>
                    <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{value}</h3>
                    {trend && (
                        <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>
                            <span style={{ color: trend === 'up' ? '#10b981' : '#ef4444' }}>
                                {trend === 'up' ? '↗' : '↘'} {trendValue}%
                            </span> vs last month
                        </p>
                    )}
                </div>
                <div style={{ fontSize: '24px', opacity: 0.8 }}>{icon}</div>
            </div>
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '100px',
                height: '100px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
            }} />
        </div>
    );

    const TabButton = ({ id, label, isActive, onClick }) => (
        <button
            onClick={() => onClick(id)}
            style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '25px',
                background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: isActive ? 'white' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: '14px'
            }}
        >
            {label}
        </button>
    );

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f8fafc',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #e2e8f0',
                        borderTop: '3px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p style={{ color: '#4a5568', fontSize: '16px' }}>Checking permissions...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // If not admin, don't render the dashboard (user will be redirected)
    if (!isAdmin) {
        return null;
    }

    const handleNavigate = () => {
        navigate('/'); // Replace '/next-page' with the desired route
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            background: '#f8fafc',
            Height: '100%',
            padding: '20px'
        }}>
            {/* Header */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px 30px',
                marginBottom: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
                <div>
                    <h1 style={{ margin: 0, color: '#1f2937', fontSize: '28px', fontWeight: 'bold' }}>
                        Helpigo Admin Dashboard
                    </h1>
                    <p style={{ margin: '5px 0 0', color: '#6b7280', fontSize: '16px' }}>
                        Welcome back, Admin {user.name || 'User'}! Here's what's happening today.
                    </p>
                    <button onClick={handleNavigate}>Move to Website</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            background: '#fee2e2',
                            color: '#dc2626',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '18px'
                        }}>
                            🔔
                        </div>
                        {notifications > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: '#ef4444',
                                color: 'white',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>
                                {notifications}
                            </div>
                        )}
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                        onClick={handleLogout}
                        title="Logout"
                    >
                        {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                </div>
            </div>

            {/* Admin Badge */}
            <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600'
            }}>
                <span>👑</span>
                Administrator Access
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    icon="📋"
                    trend="up"
                    trendValue="12"
                />
                <StatCard
                    title="Active Services"
                    value={stats.activeServices}
                    icon="🔧"
                    trend="up"
                    trendValue="8"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    icon="💰"
                    trend="up"
                    trendValue="15"
                />
                <StatCard
                    title="Satisfaction"
                    value={`${stats.customerSatisfaction}/5`}
                    icon="⭐"
                    trend="up"
                    trendValue="3"
                />
            </div>

            {/* Tab Navigation */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <TabButton id="overview" label="📊 Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
                    <TabButton id="bookings" label="📅 Recent Bookings" isActive={activeTab === 'bookings'} onClick={setActiveTab} />
                    <TabButton id="services" label="🛠️ Services" isActive={activeTab === 'services'} onClick={setActiveTab} />
                    <TabButton id="analytics" label="📈 Analytics" isActive={activeTab === 'analytics'} onClick={setActiveTab} />
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Quick Overview</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)',
                                borderRadius: '12px',
                                padding: '20px',
                                color: '#92400e'
                            }}>
                                <h4 style={{ margin: '0 0 10px', fontSize: '18px' }}>Today's Schedule</h4>
                                <p style={{ margin: 0, fontSize: '14px' }}>8 appointments scheduled</p>
                                <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Next: House Cleaning at 2:00 PM</p>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, #d1fae5 0%, #10b981 100%)',
                                borderRadius: '12px',
                                padding: '20px',
                                color: '#065f46'
                            }}>
                                <h4 style={{ margin: '0 0 10px', fontSize: '18px' }}>Weekly Performance</h4>
                                <p style={{ margin: 0, fontSize: '14px' }}>42 services completed</p>
                                <p style={{ margin: '5px 0 0', fontSize: '14px' }}>Goal: 45 services</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Recent Bookings</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb' }}>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Service</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Customer</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <td style={{ padding: '12px', fontWeight: '500' }}>{booking.service}</td>
                                            <td style={{ padding: '12px' }}>{booking.customer}</td>
                                            <td style={{ padding: '12px' }}>{booking.date}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    backgroundColor: `${getStatusColor(booking.status)}20`,
                                                    color: getStatusColor(booking.status)
                                                }}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px', fontWeight: 'bold' }}>${booking.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Service Performance</h3>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {services.map((service, index) => (
                                <div key={index} style={{
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1f2937', fontSize: '18px' }}>{service.name}</h4>
                                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                                            {service.bookings} bookings this month
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: '0 0 5px', fontWeight: 'bold', fontSize: '16px', color: '#1f2937' }}>
                                            ${service.revenue.toLocaleString()}
                                        </p>
                                        <p style={{ margin: 0, color: '#f59e0b', fontSize: '14px' }}>
                                            ⭐ {service.rating}/5
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Analytics Overview</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #ede9fe 0%, #8b5cf6 100%)',
                                borderRadius: '12px',
                                padding: '20px',
                                color: '#5b21b6'
                            }}>
                                <h4 style={{ margin: '0 0 15px', fontSize: '18px' }}>Monthly Growth</h4>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>+23%</div>
                                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Bookings increased compared to last month</p>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, #fecaca 0%, #ef4444 100%)',
                                borderRadius: '12px',
                                padding: '20px',
                                color: '#7f1d1d'
                            }}>
                                <h4 style={{ margin: '0 0 15px', fontSize: '18px' }}>Peak Hours</h4>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>2-6 PM</div>
                                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Most bookings occur during afternoon</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Admin Quick Actions */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
                <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Admin Quick Actions</h3>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {['Manage Users', 'Add New Service', 'Schedule Booking', 'View Reports', 'Manage Staff', 'System Settings'].map((action, index) => (

                        <button
                            key={index}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                padding: '12px 24px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'transform 0.3s ease',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}

                            // 👇 MAIN UPDATE — Add New Service opens a new page
                            onClick={() => {
                                if (action === 'Add New Service') {
                                    navigate('/dashboard/newservice');
                                } else {
                                    alert(`${action} clicked!`);
                                }
                            }}
                        >
                            {action}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

