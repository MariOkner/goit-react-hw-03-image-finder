import { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayHTML, ContentHTML } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {};

  state = {};

  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  componentDidUpdate() {
    console.log('Modal componentDidUpdate');
  }

  render() {
    return createPortal(
      <OverlayHTML>
        <ContentHTML>{this.props.children}</ContentHTML>
      </OverlayHTML>,
      modalRoot
    );
  }
}
