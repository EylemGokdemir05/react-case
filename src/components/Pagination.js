// import React, { useState } from "react";
// // import PropTypes from "prop-types";

// function Pagination({ itemPerPage, totalItems, paginate }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <a onClick={() => paginate(number)} className="active">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;

import React, { useState, useEffect} from "react";

function Pagination(props) {
  console.log('props: ',props)
  const [myPage,setPager] = useState({});
  const [initialPage,setInitialPage] = useState(1);
  const [pageSize,setPageSize] = useState(1);
  
  useEffect((prevProps)=>{
      if (props.items && props.items.length) {
        setPage(initialPage);
        setPageSize(props.pageSize);
      }
      
      if (props.items !== prevProps.items) {
        setPage(initialPage);
      }
  },[])
  
  const setPage = ((page) => {
      let { items, pageSize } = props;
      let pager = myPage;
      pager = getPager(items.length, page, pageSize);
      
      let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      
      setPager(pager);
      props.onChangePage(pageOfItems);
  })
  
  const getPager = ((totalItems, currentPage, pageSize) => {
      currentPage = currentPage || 1;
      pageSize = pageSize || 10;
      
      let totalPages = Math.ceil(totalItems / pageSize);
      let startPage, endPage;
      if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
      } else {
        if (currentPage <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
          startPage = totalPages - 4;
          endPage = totalPages;
        } else {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }
      }
  
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
      let pages = [...Array(endPage + 1 - startPage).keys()].map(
        i => startPage + i
      );
  
      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
  })
  
  let pager = myPage;

  if (!pager.pages || pager.pages.length <= 1) {
    return null;
  } else {
      return (
          <div className="row pro-result">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12 pagination-style">
                <div className="pagination">
                  <ul>
                    <li>
                      <button
                        disabled={pager.currentPage === 1}
                        onClick={() => setPage(pager.currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {pager.pages.map((page, index) => (
                      <li key={index}>
                        <button
                          className={pager.currentPage === page ? "active" : ""}
                          onClick={() => setPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        disabled={pager.currentPage === pager.totalPages}
                        onClick={() => setPage(pager.currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
  }
}

export default Pagination;