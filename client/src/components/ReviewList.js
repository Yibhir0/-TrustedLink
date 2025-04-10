import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "../css/ReviewList.css";

const ReviewList = ({ providerId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/reviews/provider/${providerId}`);
                const data = await res.json();
                console.log("Fetched reviews:", data);
                setReviews(data);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        };

        if (providerId) {
            fetchReviews();
        }
    }, [providerId]);

    if (loading) return <p className="loading">Loading reviews...</p>;
    if (!reviews.length) return <p className="no-reviews">No reviews yet.</p>;

    return (
        <div className="review-list">
            <h3 className="review-title">⭐ Reviews</h3>
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
            ))}
        </div>
    );
};

export default ReviewList;
