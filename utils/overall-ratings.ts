interface Review {
  rating: string | number;
}

interface RatingResult {
  percentages: number[];
  counts: number[];
}

export const formatRating = (value: number): string => {
  if (Number.isNaN(value)) return "";
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
};

const overallRatings = (reviews: Review[]): RatingResult => {
  if (!reviews || reviews.length === 0) {
    return {
      percentages: [0, 0, 0, 0, 0],
      counts: [0, 0, 0, 0, 0],
    };
  }

  const ratingCounts: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  reviews.forEach((review) => {
    const rating = Math.round(parseFloat(review.rating.toString()));
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating]++;
    }
  });

  const totalReviews = reviews.length;
  const ratingPercentages: number[] = [0, 0, 0, 0, 0];
  const counts: number[] = [0, 0, 0, 0, 0];

  Object.keys(ratingCounts).forEach((rating) => {
    const numericRating = Number(rating);
    const percentage = (
      (ratingCounts[numericRating] / totalReviews) *
      100
    ).toFixed(2);
    ratingPercentages[numericRating - 1] = parseFloat(percentage);
    counts[numericRating - 1] = ratingCounts[numericRating];
  });

  return {
    percentages: ratingPercentages,
    counts,
  };
};

export default overallRatings;
