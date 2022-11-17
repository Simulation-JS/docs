import styles from '../../styles/svgs.module.css';

export default function AddSvg({ color = '#000000' }) {
  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      className={styles.svg}
    >
      <path
        fill={color}
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
      ></path>
    </svg>
  );
}
