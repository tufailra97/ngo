import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Close } from 'icons';

const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  & > div {
    position: absolute;
    width: 80%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    div {
      position: absolute;
      right: -4rem;
      top: 0;
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
`;

const Modal: React.FC<{
  showModal: boolean;
  trailerURL: string;
  onClose: Function;
}> = ({ showModal, trailerURL, onClose }) => {
  if (showModal) {
    return (
      <ModalWrapper>
        <div>
          <div onClick={() => onClose()}>
            <Close color={'red'} height={30} width={30} />
          </div>
          <iframe
            src={'https://www.youtube.com/embed/bwzLiQZDw2I'}
            width={940}
            height={540}
            allowFullScreen
            frameBorder={0}
          ></iframe>
        </div>
      </ModalWrapper>
    );
  }
  return null;
};

export default Modal;
