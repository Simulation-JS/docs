import styles from '../styles/Overview.module.css';
import { useState, useEffect, useRef } from 'react';

export default function Overview({ element, anchorEl = null, open = false, onClose, custom = false }) {
  const [closing, setClosing] = useState(false);
  const [xPos, setXPos] = useState({ left: 0 });
  const [yPos, setYPos] = useState({ top: 0 });
  const cardRef = useRef(null);
  const animationTime = 150; // milliseconds
  const listener = () => {
    updatePosition();
  };

  const staticStyles = {
    margin: 10
  };

  const getXPos = () => {
    const rect = anchorEl?.getBoundingClientRect();
    if (rect && cardRef.current) {
      const elRect = cardRef.current.getBoundingClientRect();
      const maxX = rect.x + elRect.width + staticStyles.margin;
      if (maxX >= window.innerWidth) {
        // check overflow on right
        // return window.innerWidth - staticStyles.margin - elRect.width;
        if (rect.right - elRect.width < staticStyles.margin) {
          // when there is no space
          return { left: 0 };
        }
        // the right of the element is the right of the anchor element
        return { right: window.innerWidth - rect.right };
      }
      // element is at x pos of anchor el
      return { left: rect.x };
    }

    return { left: 0 };
  };

  const getYPos = () => {
    const rect = anchorEl?.getBoundingClientRect();
    if (rect && cardRef.current) {
      const elRect = cardRef.current.getBoundingClientRect();
      const maxY = rect.bottom + elRect.height + staticStyles.margin;
      if (maxY >= window.innerHeight) {
        // check overflow on bottom
        if (rect.y - elRect.height - staticStyles.margin < staticStyles.margin) {
          // when there is no space
          return { top: 0 };
        }
        // above the anchor element
        return { bottom: rect.y - staticStyles.margin };
      }
      // below the anchor element
      return { top: rect.bottom + staticStyles.margin };
    }
    return { top: 0 };
  };

  const updatePosition = () => {
    if (anchorEl) {
      setXPos(getXPos());
      setYPos(getYPos());
    }
  };

  useEffect(() => {
    updatePosition();
  }, [element, anchorEl, cardRef]);

  useEffect(() => {
    window.removeEventListener('resize', listener);
    window.addEventListener('resize', listener);
  }, []);

  const positionStyles = {
    position: 'absolute',
    zIndex: 110,
    ...xPos,
    ...yPos
  };

  const handleClose = (e) => {
    setClosing(true);
    setTimeout(() => {
      if (onClose) {
        onClose(e);
        setClosing(false);
      }
    }, animationTime);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return open ? (
    <div
      className={`${styles.overview} ${anchorEl === null ? styles.center : ''} ${
        closing ? styles.closing : ''
      }`}
      onClick={handleClose}
    >
      <div
        className={`${!custom ? styles.card : ''} ${closing ? styles.retract : ''}`}
        style={positionStyles}
        onClick={handleCardClick}
        ref={cardRef}
      >
        {element}
      </div>
    </div>
  ) : (
    <></>
  );
}
