import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './ReviewForm.css';

function ReviewForm({ canteenId, user_ID,scrollToReview }) {
  const [reviewText, setReviewText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();  

  
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
        // alert('Review submitted successfully!');
        toast.success('Review submitted successfully!', { autoClose: 2000 });
        setReviewText('');
        setIsExpanded(false); // Collapse after submission
        scrollToReview();

      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // alert('Something went wrong');
      toast.error('Something went wrong');
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
