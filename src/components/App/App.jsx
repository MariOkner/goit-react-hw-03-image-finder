import { Component } from 'react';
import helpers from '../../helpers';

import { SearchBar } from '../SearchBar/SearchBar';
// import { ImageGallery } from '../ImageGallery/ImageGallery'
// import { Loader } from '../Loader/Loader'
// import { Modal } from '../Modal/Modal';

import { Container } from './App.styled';

export class App extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.page = 1;
  }

  state = {
    images: [],
    isLoading: false,
    showModal: false,
    hasMoreImages: false,
    error: null,
  };

  // async componentDidUbdate(prevProps, prevState) {
  //   // const prevName = prevProps.images;
  //   // const nextName = prevProps.images;

  //   this.setState({ isLoading: true });

  // }

  handleImageFormSubmit = async query => {
    if (query.trim() === '') {
      alert('Поле поиска пустое');
      return;
    }

    this.page = 1;
    this.setState({ isLoading: true });
    this.setState({ hasMoreImages: false });
    this.setState({ error: null });

    try {
      const { hits, totalPages } = await helpers.fetchImages(query, 1);
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
    const { images, isLoading, error } = this.state;

    return (
      <Container>
        {error && <p>Whoops, something went wrong: {error.message}</p>}

        <SearchBar handleSubmit={this.handleImageFormSubmit}></SearchBar>

        {/* {isLoading ? <p>Loading...</p> : <ImageGallery images={images}></ImageGallery>} */}

        {/* <Loader /> */}

        {/* {this.state.showModal && <Modal />} */}
      </Container>
    );
  }
}
