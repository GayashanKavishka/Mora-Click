import { useState, useEffect } from 'react';

function ReviewList({ canteenId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews/${canteenId}`);
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [canteenId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id}>
          <p><strong>{review.userId.username}</strong></p>
          <p>{review.reviewText}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
