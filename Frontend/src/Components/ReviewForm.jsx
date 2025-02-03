import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './ReviewForm.css';

function ReviewForm({ canteenId }) {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'USER_ID', // Replace with the actual user ID
        canteenId,
        reviewText,
      }),
    });

    if (response.ok) {
      alert('Review submitted successfully!');
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <form className="review-form-container" onSubmit={handleSubmit}>
      <h3>Review Your Canteen Visit</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;