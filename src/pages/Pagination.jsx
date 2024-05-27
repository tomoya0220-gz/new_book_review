import PropTypes from 'prop-types';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage -1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          前へ
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          次へ
        </button>
      </div>
    </>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
