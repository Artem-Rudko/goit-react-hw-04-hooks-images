import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import { getImages } from '../src/services/images-api';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import PropTypes from 'prop-types';
import './styles.css';

export default function App() {
    // const [input, setInput] = useState('');
    const [currentImg, setCurrentImg] = useState('');
    const [tags, setTags] = useState('');
    const [imageGallery, setImageGallery] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchQuery === '') {
            return;
        }
        fetchImages(); // eslint-disable-next-line
    }, [searchQuery]);

    const inputSubmit = inputValue => {
        setSearchQuery(inputValue);
        setCurrentPage(1);
        setImageGallery([]);
        setError(null);
    };

    const toggleModal = () => {
        setCurrentImg('');
    };

    const showCurrentImg = (url, tags) => {
        setCurrentImg(url);
        setTags(tags);
    };

    const fetchImages = () => {
        setIsLoading(true);

        getImages(currentPage, searchQuery)
            .then(response => {
                setImageGallery(imageGallery => [
                    ...imageGallery,
                    ...response.data.hits,
                ]);
                setCurrentPage(currentPage => currentPage + 1);

                window.scrollTo({
                    top: document.querySelector('.ImageGallery').scrollHeight,
                    behavior: 'smooth',
                });
            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    };

    const shouldRenderLoadMoreBtn = imageGallery.length > 0 && !isLoading;

    return (
        <div className="App">
            <SearchBar onSearchClick={inputSubmit} />
            {currentImg && (
                <Modal onClose={toggleModal}>
                    <img src={currentImg} alt={tags} />
                </Modal>
            )}

            {error && (
                <h2 style={{ color: 'rgba(253, 29, 29, 1)' }}>
                    Something went wrong. Please, try again!
                </h2>
            )}

            <ImageGallery gallery={imageGallery} onImgClick={showCurrentImg} />

            {isLoading && (
                <Loader
                    className="Loader"
                    type="MutatingDots"
                    color="rgba(253, 29, 29, 1)"
                    secondaryColor="rgba(252, 176, 69, 1)"
                    height={100}
                    width={100}
                />
            )}

            {shouldRenderLoadMoreBtn && <Button onClick={fetchImages} />}
        </div>
    );
}
