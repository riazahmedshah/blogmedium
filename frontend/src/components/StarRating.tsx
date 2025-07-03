import { Star } from "lucide-react"

export const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          className={star <= rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}
        />
      ))}
    </div>
  )
}