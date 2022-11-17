import styles from '../styles/Input.module.css';

export default function TextArea({ placeholder, sx = {}, onChange, value, disabled = false }) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <textarea
      placeholder={placeholder}
      style={sx}
      onChange={handleChange}
      value={value}
      className={styles.input}
      disabled={disabled}
    />
  );
}
