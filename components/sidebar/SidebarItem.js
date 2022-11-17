import styles from '../../styles/SidebarItem.module.css';
import { useState } from 'react';
import Input from '../Input';

export default function SidebarItem({
  children,
  border = false,
  sx = {},
  editing,
  onSave,
  editValue,
  inputStyles = {}
}) {
  const [value, setValue] = useState(editValue);

  const handleSaveValue = () => {
    if (onSave) onSave(value);
  };

  inputStyles = {
    width: 'auto',
    minWidth: 0,
    flex: '1 1 auto',
    ...inputStyles
  };

  return (
    <div
      className={`${styles.item} ${border && styles.bordered}`}
      style={sx}
    >
      {editing ? (
        <Input
          placeholder="Enter new value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSaveValue}
          onClick={(e) => e.stopPropagation()}
          sx={inputStyles}
        />
      ) : (
        children
      )}
    </div>
  );
}
