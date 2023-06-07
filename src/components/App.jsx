import { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { getImages } from 'api/api';
// import { getNormalizedImages } from 'helpers/getNormalizedImages';
import { ImageGallary } from './ImageGallary/ImageGallary';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hitsImages, setHitsImages] = useState([]);
  const [shownLoadMore, setShownLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_, setError] = useState('');

  const onImageClick = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setShowModal(true);
  };

  const onSubmit = query => {
    setQuery(query.trim());
    setPage(1);
    setHitsImages([]);
  };

  const loadMoreClick = e => {
    setPage(page + 1);
  };

  useEffect(() => {
    const imagesSearch = async (query, page) => {
      try {
        if (!query.trim()) {
          return;
        }
        setIsLoading(true);
        const images = await getImages(page, query);
        console.log(images);
        setHitsImages(prevState => [...prevState, ...images.images]);
        setShownLoadMore(
          prevState => prevState.page < Math.ceil(images.totalHits / 12)
        );
        console.log(shownLoadMore);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log(error);
      }
    };

    imagesSearch(query, page);
  }, [query, page]);

  const onModalClick = e => {
    setShowModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallary hitsImages={hitsImages} onImageClick={onImageClick} />
      {shownLoadMore && <Button onClick={loadMoreClick} />}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onModalClick={onModalClick}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};
