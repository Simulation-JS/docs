import styles from '../styles/ErrorScreen.module.css';
import Button from './Button';
import Link from './Link';

export default function ErrorScreen({ children }) {
  return (
    <div className={styles.wrapper}>
      <h1>Whoops, looks like there was a problem...</h1>
      <p>{children}</p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
