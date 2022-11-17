import styles from '../../styles/ActionBox.module.css';
import Button from '../Button';

export default function ActionBox({ title, desc, action }) {
  return (
    <div className={styles.box}>
      <h1>{title}</h1>
      <span>{desc}</span>
      <Button onClick={action}>Create</Button>
    </div>
  );
}
