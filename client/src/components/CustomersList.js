import { useEffect, useState } from 'react';
import CustomerCard from './CustomerCard';
import '../css/CustomersList.css';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/users/admin/customers');
            const data = await res.json();
            setCustomers(data);
        } catch (err) {
            console.error('Failed to fetch customers', err);
        }
    };

    const handleDelete = async (id) => {

        try {
            const res = await fetch(`http://localhost:8080/api/users/admin/customers/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchCustomers();
            } else {
                alert('Failed to delete customer.');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }

    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>💼 Customers</h2>
            </div>
            <div className="card-grid">
                {customers.map((customer) => (
                    <div key={customer._id} className="card-grid-item">
                        <CustomerCard

                            customer={customer}
                            onDelete={() => handleDelete(customer._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomersList;