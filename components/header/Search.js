import styles from '../../styles/Search.module.css';

export default function Search({ placeholder }) {
  return (
    <input
      className={styles.search}
      placeholder={placeholder}
    />
  );
}
