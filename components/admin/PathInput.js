import Input from '../Input';
import styles from '../../styles/DocInput.module.css';
import Button from '../Button';
import { useState } from 'react';
import Warning from '../Warning';

export default function PathInput({ saveDoc, deleteDoc, initialMode, initialName = '', initialPath = '' }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState(initialName);
  const [path, setPath] = useState(initialPath);

  const validPath = () => {
    const regex = /[a-z0-9\-]/g;
    return (
      path != '' &&
      !path.split('').includes(' ') &&
      !path
        .split('')
        .map((l) => l.match(regex))
        .includes(null)
    );
  };

  const checkValidDoc = () => {
    return name != '' && validPath();
  };

  const handleChangeState = () => {
    if (checkValidDoc()) {
      setMode((prev) => {
        if (prev == 'mut') return 'imut';
        else return 'mut';
      });
      saveDoc({
        name,
        path,
        mode: 'imut'
      });
    }
  };

  const handleEditDoc = () => {
    saveDoc({
      name,
      path,
      mode: 'mut'
    });
  };

  return (
    <div className={`${styles.docInput} ${styles[mode]}`}>
      <Input
        placeholder="Doc Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={mode == 'imut'}
      />
      <div className={styles.pathInput}>
        <span>/</span>
        <Input
          placeholder="Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          disabled={mode == 'imut'}
        />
      </div>
      {mode === 'mut' && <Warning>The path cannot be changed after creating the group</Warning>}
      <div className={styles.controls}>
        {mode == 'imut' ? (
          <>
            <Button
              color="gray"
              onClick={handleEditDoc}
            >
              Edit
            </Button>
          </>
        ) : (
          <Button onClick={handleChangeState}>Save</Button>
        )}
        <Button
          color="gray"
          onClick={deleteDoc}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
