import styles from '../styles/Link.module.css';

export default function Link({ children, to }) {
  return (
    <a
      href={to}
      className={styles.link}
    >
      {children}
    </a>
  );
}
