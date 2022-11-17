import styles from '../../styles/Header.module.css';
import Search from './Search';
import Button from '../Button';
import { signIn, signOut } from '../../tools/firebase';
import UserPicture from '../UserPicture';
import Loading from '../Loading';
import Overview from '../Overview';
import { useState } from 'react';

export default function Header({ user, userLoading, admin = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSignIn = () => {
    signIn();
  };

  const handleToggleOverview = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    signOut();
    location.reload();
  };

  const buttonStyles = {
    width: 200
  };

  return (
    <>
      <header className={styles.header}>
        <Search placeholder="Search (not working yet)" />
        {user ? (
          <UserPicture
            user={user}
            onClick={handleToggleOverview}
          />
        ) : userLoading ? (
          <Loading size="small" />
        ) : (
          <Button
            color="blue"
            onClick={handleSignIn}
          >
            Sign in as admin
          </Button>
        )}
      </header>
      <Overview
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        element={
          <div className={styles.overviewContent}>
            <div className={styles.overviewName}>
              <UserPicture
                height={40}
                width={40}
                user={user}
              />
              <div className={styles.nameInfo}>
                <span className={styles.name}>{user?.displayName}</span>
                <span className={styles.admin}>{admin ? 'Admin' : 'User'}</span>
              </div>
            </div>
            <div className={styles.overviewActionButtons}>
              <Button
                onClick={handleSignOut}
                color="purple"
                sx={buttonStyles}
              >
                Sign Out
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
}
