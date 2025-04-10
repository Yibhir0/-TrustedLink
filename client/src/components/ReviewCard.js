import "../css/ReviewCard.css";

const ReviewCard = ({ review }) => {
    const { rating, comment, customerId, createdAt } = review;

    const date = new Date(createdAt).toLocaleDateString();
    const avatar = customerId?.profileImage || "https://i.pravatar.cc/150?u=default";

    return (
        <div className="review-card">
            <div className="review-header">
                <img src={avatar} alt="avatar" className="review-avatar" />
                <div className="review-meta">
                    <strong>{customerId?.firstName || "Customer"}</strong>
                    <span className="review-date">{date}</span>
                </div>
            </div>
            <div className="review-body">
                <div className="review-rating">⭐ {rating}/5</div>
                <p className="review-comment">{comment}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
