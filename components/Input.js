import styles from '../styles/Input.module.css';

export default function Input({ placeholder, sx = {}, onChange, value, disabled = false, onBlur, onClick }) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <input
      placeholder={placeholder}
      style={sx}
      className={styles.input}
      onChange={handleChange}
      value={value}
      disabled={disabled}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyUp={(e) => e.preventDefault()}
    />
  );
}
