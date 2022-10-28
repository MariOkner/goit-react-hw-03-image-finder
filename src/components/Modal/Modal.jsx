import { Component } from "react";
import { Overlay, ModalContent } from "./Modal.styled";

export class Modal extends Component {
    static propTypes = {};

    state = {

    };

    componentDidMount() {
        console.log( 'Modal componentDidMount')
    };

    componentDidUpdate() {
        console.log( 'Modal componentDidUpdate')
    };

    render() {
        return (
            <Overlay>
                <ModalContent>{this.props.children}</ModalContent>
            </Overlay>
        )
    };
}