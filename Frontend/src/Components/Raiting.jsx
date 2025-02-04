import { Star } from "lucide-react";

const StarRating = ({ rating = 0, totalStars = 5 }) => {
  return (
    <div className="flex space-x-1 m-2">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          className={`w-6 h-6 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
