import {
  getAuthObject,
  checkIsAdmin,
  getTabInfoFromPath,
  improveName,
  savePage,
  getPage
} from '../../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from '../../styles/Home.module.css';
import Header from '../../components/header/Header';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import PropertyInput from '../../components/admin/PropertyInput';
import DocProperties from '../../components/DocProperties';

export default function Home() {
  const router = useRouter();
  const auth = getAuthObject();
  const [user, loading] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [properties, setProperties] = useState([]);
  const [addingProperty, setAddingProperty] = useState(false);
  const [validPage, setValidPage] = useState(null);

  useEffect(() => {
    (async () => {
      if (user) {
        const isAdmin = await checkIsAdmin(user);
        setAdmin(isAdmin);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (Object.keys(router.query).length !== 0) {
        let qName = router.query.name;
        const pg = await getPage(qName);
        if (pg !== null) {
          setProperties(pg.attributes);
        }
        qName = await getTabInfoFromPath(qName);
        if (qName) {
          setValidPage(true);
          const newName = improveName(qName);
          setName(newName);
        } else {
          setValidPage(false);
        }
      }
    })();
  }, [router]);

  const addProperty = (prop) => {
    setProperties((prev) => [...prev, prop]);
  };

  const handleSetProp = (index, prop) => {
    setProperties((prev) => {
      let copy = [...prev];
      copy[index] = prop;
      console.log(copy);
      return copy;
    });
  };

  const handleSavePage = async () => {
    const pathname = router.query.name;
    savePage(name, properties, pathname);
    router.push(`/${pathname}`);
  };

  const handleDeleteProp = (index) => {
    setProperties((prev) => {
      let copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  return (
    <div className={styles.container}>
      <Sidebar
        admin={admin}
        forceActive="/admin/addinfo"
      />
      <div className={styles.full}>
        <Header
          user={user}
          userLoading={loading}
        />
        <div className={styles.content}>
          {validPage === null ? (
            <h1 className={styles.pageTitle}>Loading...</h1>
          ) : validPage ? (
            <>
              <h1>{name}</h1>
              <DocProperties
                props={properties}
                editable
                setProp={handleSetProp}
                deleteProp={handleDeleteProp}
              />
              {addingProperty && (
                <PropertyInput
                  cancelAdding={() => setAddingProperty(false)}
                  addProperty={addProperty}
                />
              )}
              {!addingProperty && <Button onClick={() => setAddingProperty(true)}>Add Property +</Button>}
              <Button onClick={handleSavePage}>Save</Button>
            </>
          ) : (
            <h1>Invalid Page Name</h1>
          )}
        </div>
      </div>
    </div>
  );
}
