import { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';

function ReviewForm({ canteenId, user_ID }) {
  const [reviewText, setReviewText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: user_ID,
      canteenId: canteenId,
      review: reviewText,
    };

    try {
      const response = await axios.post('http://localhost:5000/review/addreview', payload);
      if (response.status === 200) {
        alert('Review submitted successfully!');
        setReviewText('');
        setIsExpanded(false); // Collapse after submission
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className={`review-form-container ${isExpanded ? 'expanded' : ''}`} onClick={() =>  setIsExpanded(true)}>
      <h3>Write a Review</h3>
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience..."
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;
