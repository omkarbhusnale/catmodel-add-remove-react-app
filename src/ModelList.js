import React from 'react'
import LineModel from './LineModel'


const ModelList = ({models, handleCheck, handleDelete}) => {
  return (
        <ul>
            {models.map((model) => (
                <LineModel 
                    key={model.id}
                    model = {model}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete}
                />
            ))}
        </ul>

  )
}

export default ModelList