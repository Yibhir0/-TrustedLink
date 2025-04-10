// src/pages/AdminDashboard.jsx
import { useState } from "react";
import BookingPage from "./BookingPage";
import CustomersList from "../components/CustomersList";
import ProvidersList from "../components/ProvidersList";
import "../css/AdminDashboard.css";

const AdminDashBoard = () => {
    const [activeTab, setActiveTab] = useState("bookings");

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">🔧 Admin Dashboard</h1>
            <div className="tab-buttons">
                <button
                    className={activeTab === "bookings" ? "tab-btn active" : "tab-btn"}
                    onClick={() => setActiveTab("bookings")}
                >
                    📋 Bookings
                </button>
                <button
                    className={activeTab === "customers" ? "tab-btn active" : "tab-btn"}
                    onClick={() => setActiveTab("customers")}
                >
                    👥 Customers
                </button>
                <button
                    className={activeTab === "providers" ? "tab-btn active" : "tab-btn"}
                    onClick={() => setActiveTab("providers")}
                >
                    🛠 Providers
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "bookings" && <BookingPage />}
                {activeTab === "customers" && <CustomersList />}
                {activeTab === "providers" && <ProvidersList />}
            </div>
        </div>
    );
};

export default AdminDashBoard;
