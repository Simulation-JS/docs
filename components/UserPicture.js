import styles from '../styles/UserPicture.module.css';

export default function UserPicture({ user, onClick, height = 32.5, width = 32.5 }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <div
      className={styles.pictureWrapper}
      onClick={handleClick}
    >
      <img
        src={user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
        style={{ height, width }}
      />
    </div>
  );
}
