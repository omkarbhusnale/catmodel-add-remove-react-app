// import {FaSearch} from "react-icons/fa"

const SearchModel = ( { search, setSearch }) => {
  return (
    <form 
        className="searchForm"
        onSubmit={(e) => e.preventDefault()}
    >
        <label htmlFor="search"> Search Model </label>
        <input 
            autoFocus
            id="search"
            type="text"
            role="searchbox"
            placeholder="Search Model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // required
        />
        {/* <button 
            type="submit"
            aria-label="Search Model"    
        >
            <FaSearch />
        </button> */}
    </form>
  )
}

export default SearchModel