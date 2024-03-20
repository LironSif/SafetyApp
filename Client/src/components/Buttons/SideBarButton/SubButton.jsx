import React from 'react'
import { useNavigate } from 'react-router-dom';


const SubButton = ({ name }) => {
    const navigate = useNavigate();
    return (
      <button className='SubButton regular-text' onClick={() => navigate(`/${name.replace(/\s+/g, '-').toLowerCase()}`)}>
        {name}
      </button>
    );
  };
  
export default SubButton