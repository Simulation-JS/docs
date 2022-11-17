import styles from '../../styles/SmallButton.module.css';

export default function SmallButton({ children, sx = {}, onClick }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <div
      className={styles.smallButton}
      style={sx}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
