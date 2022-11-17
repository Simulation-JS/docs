import styles from '../styles/Button.module.css';

export default function Button({
  children,
  color = 'blue',
  onClick,
  sx = {},
  size = 'medium',
  disabled = false
}) {
  const sizes = ['large', 'medium', 'small'];
  size = sizes.includes(size) ? size : 'medium';

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      style={sx}
      className={`${styles.button} ${styles[size]} ${!disabled && styles[color]}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
