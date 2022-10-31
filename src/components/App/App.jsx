import { Component } from 'react';
import helpers from '../../helpers';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { ContainerHTML } from './App.styled';

export class App extends Component {
  static propTypes = {};

  // constructor(props) {
  //   super(props);
  //   this.page = null;
  //   this.query = null;
  // }

  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    hasMoreImages: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    console.log(prevState);
    console.log(this.state);
    if (prevState.query !== query || (prevState.page !== page && page !== 1)) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });
    this.setState({ hasMoreImages: false });
    this.setState({ error: null });

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

      this.setState({ hasMoreImages: this.page < totalPages });
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

    this.fetchImages();
  };

  handleButtonClick = () => {
    this.setState(({ page }) => ({
      page: (page += 1),
      isLoading: true,
    }));
    this.fetchImages();
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
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
          <p>Loading...</p>
        ) : (
          <ImageGallery
            images={images}
            onClick={this.toggleModal}
          ></ImageGallery>
        )}

        {hasMoreImages && <Button handleClick={this.handleButtonClick} />}

        {isLoading && <Loader />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} />
          </Modal>
        )}
      </ContainerHTML>
    );
  }
}
