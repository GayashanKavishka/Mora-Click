import { useState } from "react";

const RatingPopup = ({ isOpen, onClose, itemName, canteen_id, onRate,type,rate,itemID}) => {
console.log(rate);
  const [selectedRating, setSelectedRating] = useState(0);
  // Handle rating selection
  const handleRating = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4">Rate {itemName}</h2>

            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-3xl cursor-pointer ${
                    star <= selectedRating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                if (selectedRating > 0) {
                  onRate(itemName,type,selectedRating,canteen_id,itemID);
                  onClose();
                }
              }}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingPopup;
