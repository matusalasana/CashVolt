import React from 'react'

const TransactionPagination = ({onClickNext, onClickPrevious, pageNumber, isLastPage, isFirstPage}) => {
  return (
    <div className="bg-base-200 flex flex-col justify-center items-center p-3 my-3">
      <div className="join flex gap-3">
        <button 
          onClick={onClickPrevious}
          disabled ={isFirstPage}
          className="join-item btn"
        >«</button>
        <button 
          className="join-item btn"
        >Page {pageNumber}</button>
        <button 
          onClick={onClickNext}
          disabled={isLastPage} 
          className="join-item btn"
        >»</button>
      </div>
    </div>
  )
}

export default TransactionPagination