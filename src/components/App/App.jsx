import { Component } from 'react';
import helpers from '../../helpers';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
// import { Loader } from '../Loader/Loader'
import { Modal } from '../Modal/Modal';

import { ContainerHTML } from './App.styled';

export class App extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.page = null;
    this.query = null;
  }

  state = {
    images: [],
    isLoading: false,
    showModal: true,
    hasMoreImages: false,
    error: null,
  };

  handleImageFormSubmit = async query => {
    if (query.trim() === '') {
      alert('Поле поиска пустое');
      return;
    }

    this.page = 1;
    this.query = query;
    this.fetchImages();
  };

  handleButtonClick = () => {
    this.page += 1;
    this.fetchImages();
  };

  fetchImages = async () => {
    this.setState({ isLoading: true });
    this.setState({ hasMoreImages: false });
    this.setState({ error: null });

    try {
      const { hits, totalPages } = await helpers.fetchImages(
        this.query,
        this.page
      );
      this.setState({
        images: hits.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            smallImageURL: webformatURL,
            largeImageURL: largeImageURL,
          };
        }),
      });

      this.setState({ hasMoreImages: this.page < totalPages });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, isLoading, showModal, hasMoreImages, error } = this.state;

    return (
      <ContainerHTML>
        <SearchBar handleSubmit={this.handleImageFormSubmit}></SearchBar>

        {error && <p>{error.message}</p>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ImageGallery images={images}></ImageGallery>
        )}

        {hasMoreImages && <Button handleClick={this.handleButtonClick} />}

        {/* <Loader /> */}

        {showModal && <Modal onClose={this.toggleModal}></Modal>}
      </ContainerHTML>
    );
  }
}
