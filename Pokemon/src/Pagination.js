import React from 'react'

export default function Pagination(gotoNextPage,gotoPrevPage) {
  return (
    <div>
       {gotoPrevPage && <button onClick={gotoNextPage}>Previous</button>}
        {gotoNextPage && <button onClick={gotoPrevPage}>Next</button>}
      
    </div>
  )
}
