import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProps as StyleThemeProps } from 'styled-components';
import { Paragraph } from 'elements/Typography';
import { ThemeProps } from 'interfaces';

const ReadMoreWrapper = styled.div`
  .read-more {
    overflow: hidden;
    transition: height 0.5s ease;
    margin-bottom: 1rem;
  }

  .read-more-controls-btn {
    span {
      display: table;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      cursor: pointer;

      &::after {
        content: '';
        width: 0;
        margin-top: 0.2rem;
        display: block;
        height: 0.1rem;
        background-color: ${(props: StyleThemeProps<ThemeProps>) =>
          props.theme.textColour};
        transition: width 0.5s ease;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
  }
`;

let nLines: number = 0; // number of lines

const ReadMore: React.FC<{
  maxLine: number;
  texts: string;
  lineHeight: number;
  classNames: string;
}> = ({ maxLine, texts, lineHeight, classNames }) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isOverflown, setOverflowStatus] = useState(false);
  const [showAll, setShowStatus] = useState(false);

  const setParagraphHeight = (lines: number): void => {
    if (paragraphRef.current) {
      paragraphRef.current.style.height =
        ((lines * lineHeight) / 10).toString() + 'rem';
    }
  };

  useEffect(() => {
    if (paragraphRef.current) {
      nLines = paragraphRef.current.clientHeight / lineHeight;
      if (nLines > maxLine) {
        setParagraphHeight(maxLine);
        setOverflowStatus(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showAll) {
      if (paragraphRef.current) {
        setParagraphHeight(nLines);
      }
    } else if (isOverflown && !showAll) {
      if (paragraphRef.current) {
        setParagraphHeight(maxLine);
      }
    }
  }, [showAll]);

  return (
    <ReadMoreWrapper>
      <Paragraph ref={paragraphRef} className={`${classNames} read-more`}>
        {texts}
      </Paragraph>
      {isOverflown && (
        <div
          className='read-more-controls-btn'
          onClick={() => setShowStatus(!showAll)}
        >
          <span>{!showAll ? 'Read More' : 'Read Less'}...</span>
        </div>
      )}
    </ReadMoreWrapper>
  );
};

export default ReadMore;
