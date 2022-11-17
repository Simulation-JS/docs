import AdminSiteWrapper from '../../components/admin/AdminSiteWrapper';
import homeStyles from '../../styles/Home.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import styles from '../../styles/creategroup.module.css';
import Input from '../../components/Input';
import { getAuthObject, createGroup, getGroup } from '../../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import PathInput from '../../components/admin/PathInput';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';

export default function Home() {
  const auth = getAuthObject();
  const [user, loading, error] = useAuthState(auth);
  const [groupName, setGroupName] = useState('');
  const [docs, setDocs] = useState([]);
  const [query, setQuery] = useState(null);
  const router = useRouter();

  const handleAddNewDoc = () => {
    setDocs((prev) => {
      const obj = {
        name: '',
        path: '',
        mode: 'mut'
      };
      return [...prev, obj];
    });
  };

  const setDoc = (doc, index) => {
    setDocs((prev) => {
      const newDocs = prev.map((d, i) => {
        if (index == i) {
          return Object.assign({}, doc);
        } else return d;
      });
      return newDocs;
    });
  };

  const deleteDoc = (index) => {
    setDocs((prev) => {
      return prev.filter((_, i) => index != i);
    });
  };

  const saveGroup = async () => {
    const newDocs = docs.map((item) => {
      const copy = Object.assign({}, item);
      delete copy.mode;
      return copy;
    });
    await createGroup(groupName, newDocs, true);
    router.push('/');
  };

  const checkCompleted = () => {
    return (
      docs.reduce((prev, current) => {
        if (!prev) return false;
        if (current.mode == 'imut') return true;
        else return false;
      }, true) && groupName != ''
    );
  };

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      setQuery({ ...router.query });
    } else {
      if (query !== null) {
        setQuery(null);
      }
    }
  }, [router]);

  const parseDbPaths = (paths) => {
    paths = paths.map((item) => {
      const copy = { ...item };
      delete copy.isPath;
      copy.name = copy.show;
      delete copy.show;
      copy.mode = 'imut';
      copy.path = copy.path.substring(1);
      return copy;
    });
    return paths;
  };

  useEffect(() => {
    (async () => {
      if (query) {
        const name = query.name;
        const dbPaths = await getGroup(name);
        const newPaths = parseDbPaths(dbPaths.paths);
        setDocs(newPaths);
        setGroupName(name);
      }
    })();
  }, [query]);

  return (
    <AdminSiteWrapper>
      <div className={homeStyles.container}>
        <Sidebar admin />
        <div className={homeStyles.full}>
          <Header
            user={user}
            userLoading={loading}
          />
          <div className={styles.formWrapper}>
            <Input
              placeholder="Group Name"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
              sx={{ width: 350 }}
            />
            {docs.length > 0 && (
              <div className={`${styles.docInputs} ${checkCompleted() ? styles.completed : ''}`}>
                {docs.map((doc, index) => (
                  <PathInput
                    key={v4()}
                    saveDoc={(doc) => setDoc(doc, index)}
                    deleteDoc={() => deleteDoc(index)}
                    initialMode={doc.mode}
                    initialName={doc.name}
                    initialPath={doc.path}
                  />
                ))}
              </div>
            )}
            <Button onClick={handleAddNewDoc}>Add New Doc +</Button>
            <Button
              onClick={saveGroup}
              disabled={!checkCompleted()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </AdminSiteWrapper>
  );
}
