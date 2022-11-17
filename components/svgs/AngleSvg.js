import styles from '../../styles/AngleSvg.module.css';

export default function AngleSvg({ color = '#000000' }) {
  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      className={styles.svg}
    >
      <path
        fill={color}
        d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      ></path>
    </svg>
  );
}
