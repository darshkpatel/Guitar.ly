import React from 'react';
import styles from './styles/card.module.css';

const Card = ({ children, width }) => {
  return (
    <div className={styles.card} style={{ width: width || '80%' }}>
      {children}
    </div>
  );
};

export default Card;
