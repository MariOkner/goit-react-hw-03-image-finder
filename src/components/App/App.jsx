import { Component } from 'react';
import PropTypes from 'prop-types';
import helpers from '../../helpers';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { ContainerHTML } from './App.styled';

export class App extends Component {
  static propTypes = {
    images: PropTypes.array,
    query: PropTypes.string,
    page: PropTypes.string,
    isLoading: PropTypes.bool,
    showModal: PropTypes.bool,
    hasMoreImages: PropTypes.bool,
    error: PropTypes.string,
    largeImageURL: PropTypes.string,
  };

  state = {
    images: [],
    query: null,
    page: null,
    isLoading: false,
    showModal: false,
    hasMoreImages: false,
    error: null,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({
      isLoading: true,
      hasMoreImages: false,
      error: null,
    });

    try {
      const { hits, totalPages } = await helpers.fetchImages(query, page);
      this.setState({
        images: hits.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            smallImageURL: webformatURL,
            largeImageURL: largeImageURL,
          };
        }),
      });

      this.setState({ hasMoreImages: page < totalPages });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageFormSubmit = query => {
    if (query.trim() === '') {
      alert('Поле поиска пустое');
      return;
    }

    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };

  handleButtonClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
      showModal: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      hasMoreImages,
      error,
      largeImageURL,
    } = this.state;

    return (
      <ContainerHTML>
        <SearchBar handleSubmit={this.handleImageFormSubmit}></SearchBar>

        {error && <p>{error.message}</p>}

        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            images={images}
            onClick={this.handleImageClick}
          ></ImageGallery>
        )}

        {hasMoreImages && <Button handleClick={this.handleButtonClick} />}

        {showModal && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </ContainerHTML>
    );
  }
}
