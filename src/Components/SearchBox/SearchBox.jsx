import React from 'react'
import { IoSearch } from "react-icons/io5";
const SearchBox = () => {
  return (
    <div className='searchBox d-flex align-items-center'>
        <IoSearch/>
        <input type='text' placeholder='Find here...'/>
    </div>
  )
}

export default SearchBox
