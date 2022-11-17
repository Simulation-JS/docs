import styles from '../../styles/SidebarButton.module.css';
import SidebarItem from './SidebarItem';
import XSvg from '../svgs/XSvg';
import SmallButton from './SmallButton';
import { useRouter } from 'next/router';
import AddSvg from '../svgs/AddSvg';
import EditSvg from '../svgs/EditSvg';
import CheckMarkSvg from '../svgs/CheckMarkSvg';
import { useState } from 'react';

export default function SidebarButton({
  children,
  onClick,
  to = null,
  active = false,
  admin = false,
  handleDeleteDoc,
  isDropdown = false,
  onAdd,
  editable = null,
  updateItem
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [itemValue, setItemValue] = useState(editable);

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  const buttonStyles = {
    marginRight: 15,
    height: 24
  };

  const handleTo = (e) => {
    e.stopPropagation();
    if (router.asPath != to) {
      router.push(to);
    }
  };

  const handleOnAdd = (e) => {
    if (onAdd) onAdd(e);
  };

  const handleEditSave = () => {
    updateItem(itemValue);
    setEditing(false);
  };

  const handleUpdateItemValue = (value) => {
    setItemValue(value);
  };

  const inputStyles = {
    maxWidth: 170,
    borderColor: 'rgba(255, 255, 255, 0.75)'
  };

  const checkActive = () => {
    if (Array.isArray(active)) {
      return active.includes(to);
    }
    return active === to;
  };

  const button = (
    <button
      className={`${styles.btn} ${checkActive() && styles.active}`}
      onClick={handleClick}
    >
      <SidebarItem
        editValue={editable}
        editing={editing}
        onSave={handleUpdateItemValue}
        inputStyles={inputStyles}
      >
        {children}
      </SidebarItem>
      {admin &&
        (editing ? (
          <SmallButton
            sx={buttonStyles}
            onClick={handleEditSave}
          >
            <CheckMarkSvg color="#ffffff" />
          </SmallButton>
        ) : (
          <>
            <SmallButton
              sx={buttonStyles}
              onClick={handleDeleteDoc}
            >
              <XSvg color="#ffffff" />
            </SmallButton>
            <SmallButton
              sx={buttonStyles}
              onClick={() => setEditing(true)}
            >
              <EditSvg color="#ffffff" />
            </SmallButton>
            {isDropdown && (
              <SmallButton
                sx={buttonStyles}
                onClick={handleOnAdd}
              >
                <AddSvg color="#ffffff" />
              </SmallButton>
            )}
          </>
        ))}
    </button>
  );

  return to != null ? <div onClick={handleTo}>{button}</div> : button;
}
