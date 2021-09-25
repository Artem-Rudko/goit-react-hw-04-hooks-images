import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export default function SearchBar({ onSearchClick }) {
    const [inputValue, setInputValue] = useState('');

    const inputValueHandler = event => {
        setInputValue(event.target.value);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        onSearchClick(inputValue);
    };

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={formSubmitHandler}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    value={inputValue}
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={inputValueHandler}
                />
            </form>
        </header>
    );
}

SearchBar.propTypes = {
    onSearchClick: PropTypes.func.isRequired,
};
