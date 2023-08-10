import React, { useState, useEffect } from 'react';

const Pagination = ({setActivePageNo,totalPages }) => {
 
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (page) => {
    setActivePage(page);
    setActivePageNo(page);
  };
  useEffect(() => {
    setActivePage(1); // Reset the activePage state to 1 whenever totalPages changes
  }, [totalPages]);
  
  useEffect(() => {
    console.log('Active Page:', activePage);
  }, [activePage]);

  const renderPageLinks = () => {
    const links = [];
    for (let page = 1; page <= totalPages; page++) {
      links.push(
        <li
          key={page}
          className={`page-item ${activePage === page ? 'active' : ''}`}
        >
          <p
            className="page-link"
           
            onClick={() => handlePageClick(page)}
          >
            {page}
          </p>
        </li>
      );
    }
    return links;
  };

  return (
    <nav className="app-pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <p
            className="page-link"
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => handlePageClick(activePage - 1)}
          >
            Previous
          </p>
        </li>
        {renderPageLinks()}
        <li
          className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}
        >
          <p
            className="page-link"
            onClick={() => handlePageClick(activePage + 1)}
          >
            Next
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
