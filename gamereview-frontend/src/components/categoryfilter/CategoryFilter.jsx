import './categoryfilter.css';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {

    const categories = [
        "All",
        "Action",
        "Adventure",
        "RPG",
        "Strategy",
        "Simulation",
        "Sports",
        "Racing",
        "Horror",
        "Platformer",
        "Puzzle"
    ];

    return (
        <div className="category-filter">
        {
            categories.map(category => (
                <button
                    className={
                    `category-filter__button ${
                        activeCategory === category
                        ? 'category-filter__button--active'
                        : ''
                    }`
                    }
                    key={category}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))
        }
        </div>
    );    
};

export default CategoryFilter;