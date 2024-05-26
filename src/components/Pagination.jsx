import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, setOffset } from "../redux/slices/bookSlice";

export const Pagination = () => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.books.offset);
  const reviewsPerPage = useSelector((state) => state.books.reviewsPerPage);
  const totalReviews = useSelector((state) => state.books.reviews.length);

  const handlePrevious = () => {
    const newOffset = Math.max(offset - 10, 0);
    dispatch(setOffset(newOffset));
    dispatch(fetchReviews(newOffset));
  };

  const handleNext = () => {
    const newOffset = offset + 10;
    dispatch(setOffset(newOffset));
    dispatch(fetchReviews(newOffset));
  };

  return (
    <>
      <div>
        <button onClick={handlePrevious} disabled={offset === 0}>
          前へ
        </button>
        <button onClick={handleNext} disabled={offset + reviewsPerPage >= totalReviews}>
          次へ
        </button>
      </div>
    </>
  );
};