import styles from '../../styles/svgs.module.css';

export default function CheckMarkSvg({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={styles.svg}
    >
      <path
        fill={color}
        d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
      ></path>
    </svg>
  );
}
