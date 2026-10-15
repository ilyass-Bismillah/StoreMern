import { Star, StarHalf } from "lucide-react";
const Rating = ({ value, text }) => {
  return (
    <div className="flex">
      <span className="flex items-center gap-0.5">
        {value >= 1 ? (
          <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
        ) : value >= 0.5 ? (
          <StarHalf className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : (
          <Star fill="none" className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        )}
        {value >= 2 ? (
          <Star className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : value >= 1.5 ? (
          <StarHalf className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : (
          <Star fill="none" className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        )}
        {value >= 3 ? (
          <Star className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : value >= 2.5 ? (
          <StarHalf className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : (
          <Star fill="none" className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        )}
        {value >= 4 ? (
          <Star className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : value >= 3.5 ? (
          <StarHalf className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : (
          <Star fill="none" className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        )}
        {value >= 5 ? (
          <Star className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : value >= 4.5 ? (
          <StarHalf className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        ) : (
          <Star fill="none" className="w-4 h-4 fill-amber-500 stroke-amber-500"/>
        )}
      </span>
      {text && <span className="ml-2 text-gray-300">({text})</span>}
    </div>
  );
};

export default Rating;
