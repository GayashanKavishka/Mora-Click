import { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewList.css';

function ReviewList({ canteenId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!canteenId) {
        console.warn("Canteen ID is missing!");
        return;
      }

      try {
        const response = await axios.post('https://mora-click-7.onrender.com/review/getreview', {
          canteenId:canteenId// Correctly passing canteenId as a query parameter
        });

        console.log("Review data received:", response.data);

        // Ensure the response follows the expected structure and correctly sets reviews
        if (response.data && response.data.data) {
          setReviews(response.data.data); 
        } else {
          console.error("Unexpected response format:", response.data);
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [canteenId]);

  return (
    <div className="review-container">
      <h3 className="review-title">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <p className="review-user">{review.userId?.username || "Anonymous"}</p>
              <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <div className='bg-slate-100 w-[600] h-[40px] flex justify-start items-center rounded'><p className="review-text m-2">{review.review}</p></div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
