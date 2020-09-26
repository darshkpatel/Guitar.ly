import React from 'react';
import styles from './styles/card.module.css';

const ListRow = ({ children }) => {
  return <div className={styles.listRow}>{children}</div>;
};

export default ListRow;
