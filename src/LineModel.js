import React from 'react'
import {FaTrashAlt} from "react-icons/fa"


const LineModel = ({model, handleCheck, handleDelete}) => {
  return (
    <li className="model">
        <input 
            type="checkbox"
            onChange={() => handleCheck(model.id)}
            checked = {model.checked} 
        />
        <label
            style={(model.checked) ? {
                textDecoration:"line-through"
            } : null}
            onDoubleClick={() => handleCheck(model.id)}>
            {model.model}
        </label>
        <FaTrashAlt 
            onClick={() => handleDelete(model.id)}
            role="button"  
            tabIndex="0" 
            aria-label={`Delete ${model.model}`}
        />
    </li>
  )
}

export default LineModel