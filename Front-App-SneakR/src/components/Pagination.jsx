// Pagination.jsx

import React, { useEffect, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageRange, setPageRange] = useState(getPageRange());
  const [targetPage, setTargetPage] = useState('');

  function getPageRange() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 480) {
      return 1;
    } else if (windowWidth < 640) {
      return 2;
    } else if (windowWidth < 770) {
      return 3;
    } else if (windowWidth < 900) {
      return 4;
    } else if (windowWidth < 1150) {
      return 5;
    } else if (windowWidth < 1280) {
      return 6;
    } else if (windowWidth < 1440) {
      return 7;
    } else if (windowWidth < 1600) {
      return 8;
    } else if (windowWidth < 1920) {
      return 9;
    }
  }

  useEffect(() => {
    function handleResize() {
      setPageRange(getPageRange());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const range = pageRange;

    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleJumpToPage = () => {
    const target = parseInt(targetPage, 10);

    if (!isNaN(target) && target >= 1 && target <= totalPages && target !== currentPage) {
      onPageChange(target);
      setTargetPage('');
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 my-1 text-white bg-custom-blue rounded hover:bg-custom-hover-blue disabled:opacity-50"
      >
        &laquo;
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-2 mx-1 my-1 font-semibold ${
            pageNumber === currentPage ? 'text-white bg-custom-blue' : 'text-custom-blue bg-white rounded hover:bg-custom-hover-blue'
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 my-1 text-white bg-custom-blue rounded hover:bg-custom-hover-blue disabled:opacity-50"
      >
        &raquo;
      </button>

      <div className="flex items-center mx-4">
        <input
          type="number"
          value={targetPage}
          onChange={(e) => setTargetPage(Math.min(Math.max(parseInt(e.target.value, 10) || 1, 1), totalPages).toString())}
          className="w-16 p-2 border rounded focus:outline-none text-custom-blue"
          placeholder="Page"
          min="1"
          max={totalPages.toString()}
        />
        <button onClick={handleJumpToPage} className="px-3 py-2 mx-1 my-1 text-white bg-custom-blue rounded hover:bg-custom-hover-blue disabled:opacity-50">
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
