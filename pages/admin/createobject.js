import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import AdminSiteWrapper from '../../components/admin/AdminSiteWrapper';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import homeStyles from '../../styles/Home.module.css';
import { getAuthObject, createObjectDocPage } from '../../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../styles/DocInput.module.css';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const auth = getAuthObject();
  const [user, loading, error] = useAuthState(auth);

  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [valid, setValid] = useState(false);

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

  const isValidDoc = () => {
    return name !== '' && validPath();
  };

  const createDoc = async () => {
    if (isValidDoc()) {
      await createObjectDocPage(name, '/' + path);
      router.push('/');
    }
  };

  useEffect(() => {
    setValid(isValidDoc());
  }, [name, path]);

  return (
    <AdminSiteWrapper>
      <div className={homeStyles.container}>
        <Sidebar admin />
        <div className={homeStyles.full}>
          <Header
            user={user}
            userLoading={false}
          />
          <div className={homeStyles.content}>
            <h1 className={homeStyles.pageTitle}>Create Object Doc</h1>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <div className={styles.pathInput}>
              <span>/</span>
              <Input
                placeholder="Path"
                value={path}
                onChange={(e) => setPath(e.currentTarget.value)}
              />
            </div>
            <Button
              onClick={createDoc}
              disabled={!valid}
            >
              Create Doc
            </Button>
          </div>
        </div>
      </div>
    </AdminSiteWrapper>
  );
}
