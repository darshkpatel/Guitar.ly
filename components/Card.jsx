import React from 'react';
import styles from './styles/card.module.css';

const Card = ({ children, cardStyle }) => {
  return (
    <div className={styles.card} style={cardStyle}>
      {children}
    </div>
  );
};

export default Card;
