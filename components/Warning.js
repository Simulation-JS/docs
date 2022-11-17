import styles from '../styles/Home.module.css';
import WarningSvg from './svgs/WarningSvg';

export default function Warning({ children }) {
  return (
    <span className={styles.warning}>
      <WarningSvg
        color="#f44336"
        sx={{ height: 24, width: 24 }}
      />
      {children}
    </span>
  );
}
