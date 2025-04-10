import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

import ProviderCard from './ProviderCard';

const ProvidersList = () => {
    const [providers, setProviders] = useState([]);
    const navigate = useNavigate();


    const fetchProviders = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/providers/admin/all");
            const data = await res.json();
            setProviders(data);
        } catch (err) {
            console.error("Failed to fetch providers", err);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    const handleDelete = async (id) => {


        try {
            const res = await fetch(`http://localhost:8080/api/providers/admin/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchProviders(); // Refresh list
            } else {
                alert("Failed to delete provider.");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }

    };

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>🧑‍🔧 Providers</h2>
                <button className="add-button" onClick={() => navigate("/add-provider")}>
                    ➕ Add Provider
                </button>
            </div>

            <div className="card-grid">
                {providers.map((provider) => (
                    <div className="card-grid-item" key={provider._id}>
                        <ProviderCard provider={provider} onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProvidersList;
