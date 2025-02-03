import { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';

function ReviewForm({ canteenId, user_ID }) {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging Logs
    console.log('User ID:', user_ID);
    console.log('Canteen ID:', canteenId);
    console.log('Review:', reviewText);
    const payload = {
      userId: user_ID,
      canteenId: canteenId,
      review: reviewText,
    };

    console.log('payload:', payload);

    try {
     

      console.log('Submitting review with payload:', payload);

      const response = await axios.post('http://localhost:5000/review/addreview', payload);

      if (response.status === 200) {
        alert('Review submitted successfully!');
        setReviewText('');
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:');

      // Additional error details
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }

      alert('Something went wrong');
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
