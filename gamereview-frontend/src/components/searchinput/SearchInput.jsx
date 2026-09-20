import './searchinput.css';

const SearchInput = ({ search, onSearchChange }) => {
    return (
        <input 
            className="search-input" 
            type="text"
            value={search}
            placeholder="Search by title..."
            onChange={ event => onSearchChange(event.target.value) }   
        />
    )
}

export default SearchInput;