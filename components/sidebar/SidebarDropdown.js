import styles from '../../styles/SidebarDropdown.module.css';
import SidebarButton from './SidebarButton';
import AngleSvg from '../svgs/AngleSvg';
import { useState, useRef, useEffect } from 'react';
import { deleteGroup, renameGroup } from '../../tools/firebase';
import { useRouter } from 'next/router';

export default function SidebarDropdown({ text, children, isOpen = false, admin = false, fetchTabs }) {
  const [open, setOpen] = useState(isOpen);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const height = dropdownRef.current.getBoundingClientRect().height;
    setDropdownHeight(height);
  }, [dropdownRef]);

  const handleToggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleDeleteDoc = async () => {
    await deleteGroup(text);
    fetchTabs();
  };

  const handleAddPath = () => {
    router.push(`/admin/creategroup?name=${text}`);
  };

  const handleUpdateItem = async (value) => {
    await renameGroup(text, value);
    fetchTabs();
  };

  return (
    <div className={styles.sidebarDropdown}>
      <SidebarButton
        onClick={handleToggleDropdown}
        admin={admin}
        handleDeleteDoc={handleDeleteDoc}
        isDropdown
        onAdd={handleAddPath}
        editable={text}
        updateItem={handleUpdateItem}
      >
        <div className={`${styles.arrow} ${open && styles.rotated}`}>
          <AngleSvg color="#ffffff" />
        </div>
        <span className={styles.span}>{text}</span>
      </SidebarButton>
      <div
        className={styles.contentWrapper}
        style={open ? { height: `${dropdownHeight}px` } : { height: '0px' }}
      >
        <div
          className={styles.content}
          ref={dropdownRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
