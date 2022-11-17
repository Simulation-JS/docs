import styles from '../styles/Loading.module.css';

export default function Loading({ size = 'medium', color = 'blue' }) {
  const sizeArr = ['medium', 'small'];
  const sizeStr = sizeArr.includes(size) ? size : 'medium';
  size = size == 'medium' ? 60 : size == 'small' ? 32.5 : 60;
  return (
    <svg
      height={size}
      width={size}
      className={styles.svg}
    >
      <circle
        className={`${styles[sizeStr]} ${styles[color]} ${styles.circle}`}
        cx={size / 2}
        cy={size / 2}
        r={size / 3}
        strokeLinecap="round"
      ></circle>
    </svg>
  );
}
