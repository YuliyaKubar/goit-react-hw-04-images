import { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { getImages } from 'api/api';
import { getNormalizedImages } from 'helpers/getNormalizedImages';
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

  const onImageClick = ({ largeImageURL, tags }) => {
    
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setShowModal(true)
  };

  const onSubmit = query => {
    setQuery(query.trim());
    setPage(1);
    setHitsImages([])
  };

  const loadMoreClick = e => {
    setPage(page + 1)
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.query === this.state.query &&
  //     prevState.page === this.state.page
  //   ) {
  //     return;
  //   }
  //   if (!this.state.query.trim()) {
  //     return;
  //   }
  //   this.setState({ isLoading: true });
  //   try {
  //     const {
  //       data: { hits, totalHits },
  //     } = await getImages({
  //       query: this.state.query,
  //       page: this.state.page,
  //     });
  //     this.setState(prevState => ({
  //       hitsImages: [...prevState.hitsImages, ...getNormalizedImages(hits)],
  //       shownLoadMore: prevState.page < Math.ceil(totalHits / 12),
  //     }));
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  useEffect(() => {
    if (query) {
      return
    }
    if (!query.trim()) {
      return
    }
    setIsLoading(true)
    try {
      const data = { hits, totalHits }
    } = {
      getImages(setQuery, setPage)
      setHitsImages(prevState => ([...prevState, ...getNormalizedImages(hits)]))
      shownLoadMore: prevState.page < Math.ceil(totalHits / 12),}
    catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  }, [query, page])

  const onModalClick = e => {
    setShowModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallary
        hitsImages={hitsImages}
        onImageClick={onImageClick}
      />
      {shownLoadMore && <Button onClick={loadMoreClick} />}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onModalClick={onModalClick}
        />
      )}
      {this.state.isLoading && <Loader />}
    </>
  );
};
