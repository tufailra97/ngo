import React, { useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ThemeProps } from 'interfaces';
import { Close } from 'icons';

const ModalWrapper = styled.div`
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: background-color 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
  transform: translateY(100%);

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

    .close-btn {
      cursor: pointer;
      transition: transform 0.5s ease;
      transform-origin: center;

      &:hover {
        transform: rotate(90deg) scale(1.2);
      }
    }
  }
`;

const Modal: React.FC<{
  showModal: boolean;
  trailerURL: string;
  onClose: Function;
}> = ({ showModal, trailerURL, onClose }) => {
  const container = useRef<HTMLDivElement>(null);
  const theme: ThemeProps = useContext(ThemeContext);

  const handleClose = () => {
    if (container.current) {
      container.current.style.transform = 'translateY(100%)';
    }
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      if (container.current) {
        container.current.style.transform = 'translateY(0)';
        setTimeout(() => {
          if (container.current) {
            container.current.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          }
        }, 500);
      }
    }, 10);
  });

  if (showModal) {
    return (
      <ModalWrapper ref={container}>
        <div>
          <div onClick={handleClose} className='close-btn'>
            <Close color={theme.lightTextColour} height={30} width={30} />
          </div>
          <iframe
            src={trailerURL}
            width={940}
            height={540}
            allowFullScreen
            frameBorder={0}
            allow='autoplay; encrypted-media'
          ></iframe>
        </div>
      </ModalWrapper>
    );
  }
  return null;
};

export default Modal;
