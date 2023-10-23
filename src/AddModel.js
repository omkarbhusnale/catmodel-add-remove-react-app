import {FaPlus} from "react-icons/fa"
import { useRef } from "react"


const AddModel = ({ newModel, setNewModel, handleSubmit }) => {

    const inputRef = useRef()

    return (
    <form
        className="addForm"
        onSubmit={handleSubmit}
    >
        <label htmlFor="addModel"> Add Model </label>
        <input 
            autoFocus
            id="addModel"
            type="text"
            ref={inputRef}
            placeholder="Add Hardware Model"
            required
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
        />
        <button 
            type="submit"
            aria-label="Add Model"    
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddModel