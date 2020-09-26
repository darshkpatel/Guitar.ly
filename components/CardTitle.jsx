import React from 'react';
import styles from './styles/card.module.css';

const CardTitle = ({ children }) => {
  return (
    <div className={styles.cardTitle}>
      {children}
      <div className={styles.titleUnderline} />
    </div>
  );
};

export default CardTitle;
