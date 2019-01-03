import React from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components';

const ModalWrapper = Styled.div`
  z-index: 999;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = Styled.div`
  background: #fff;
  padding: 2rem;
  position: relative;
`;

const CloseBtn = Styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {
	render() {
		return ReactDOM.createPortal(
			<ModalWrapper onClick={this.props.handleClose}>
				<ModalBody onClick={(e) => e.stopPropagation()}>
					<CloseBtn onClick={this.props.handleClose}>X</CloseBtn>
					{this.props.children}
				</ModalBody>
			</ModalWrapper>,
			modalRoot
		);
	}
}
