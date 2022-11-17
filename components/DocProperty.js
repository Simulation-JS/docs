import styles from '../styles/DocProperty.module.css';
import PropertyInput from './admin/PropertyInput';
import Code from './Code';
import { useState } from 'react';

export default function DocProperty({ prop, editable = false, setProp, deleteProp }) {
  const [editing, setEditing] = useState(false);

  const Info = () => (
    <>
      <span className={styles.title}>{prop.title}</span>
      <span className={styles.desc}>{prop.desc}</span>
      {prop.code && prop.code !== '' ? <Code>{prop.code}</Code> : <></>}
    </>
  );

  const handleDelete = () => {
    deleteProp();
  };

  const handleUpdateEdit = (prop) => {
    setProp(prop);
  };

  return (
    <div className={styles.wrapper}>
      {!editing ? (
        editable ? (
          <div className={`${editable && styles.editable} ${styles.propWrapper}`}>
            <section>
              <Info />
            </section>
            <div className={styles.editableControls}>
              <button
                className={styles.editBtn}
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <Info />
        )
      ) : (
        <PropertyInput
          cancelAdding={() => setEditing(false)}
          addProperty={handleUpdateEdit}
          defaultTitle={prop.title}
          defaultDesc={prop.desc}
          defaultCode={prop.code}
        />
      )}
    </div>
  );
}
