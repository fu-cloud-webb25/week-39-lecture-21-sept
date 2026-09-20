import './searchcontrols.css';
import SearchInput from '../searchinput/SearchInput';
import CategoryFilter from '../categoryfilter/CategoryFilter';

const SearchControls = ({ 
    activeCategory, 
    onCategoryChange,
    search,
    onSearchChange 
}) => {
    return (
        <section className="search-controls">
            <SearchInput 
                search={search}
                onSearchChange={onSearchChange}
            />
            <CategoryFilter 
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
            />
        </section>
    )
}

export default SearchControls;