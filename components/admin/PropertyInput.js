import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import styles from '../../styles/PropertyInput.module.css';
import TextArea from '../TextArea';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function PropertyInput({
  cancelAdding,
  addProperty,
  defaultTitle = '',
  defaultDesc = '',
  defaultCode = null
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [desc, setDesc] = useState(defaultDesc);
  const [code, setCode] = useState(defaultCode);
  const [addingCode, setAddingCode] = useState(code !== null);

  const handleAdd = () => {
    const obj = {
      title,
      desc,
      code
    };
    addProperty(obj);
    cancelAdding();
  };

  const handleCancel = () => {
    cancelAdding();
  };

  const checkCanAdd = () => {
    return title !== '' && desc !== '';
  };

  return (
    <div className={styles.wrapper}>
      <Input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextArea
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      {addingCode && (
        <CodeMirror
          value={code ? code : ''}
          width="375px"
          height="150px"
          extensions={[javascript({ jsx: true })]}
          onChange={(val) => setCode(val)}
        />
      )}
      {!addingCode && <Button onClick={() => setAddingCode(true)}>Add Code</Button>}
      <div className={styles.controls}>
        {checkCanAdd() && <Button onClick={handleAdd}>Add</Button>}
        <Button
          onClick={handleCancel}
          color="gray"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
