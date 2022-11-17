import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import styles from '../styles/Home.module.css';
import Header from '../components/header/Header';
import { getAuthObject } from '../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { checkIsAdmin, getPage } from '../tools/firebase';
import ActionBox from '../components/admin/ActionBox';
import DocProperties from '../components/DocProperties';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();
  const auth = getAuthObject();
  const [user, loading, error] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);
  const [page, setPage] = useState(null);

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
      if (router.asPath !== '[name]') {
        const pg = await getPage(router.asPath);
        if (!pg) setPage(false);
        else setPage(pg);
        console.log(pg);
      }
    })();
  }, [router.asPath]);

  const handleEditPage = () => {
    router.push(`/admin/createpage?name=${router.asPath.substring(1)}`);
  };

  return (
    <main className={styles.container}>
      <Sidebar admin={admin} />
      <div className={styles.full}>
        <Header
          user={user}
          userLoading={loading}
          admin={admin}
        />
        {admin && page !== null && page !== false && (
          <div className={styles.adminPageControls}>
            <Button
              onClick={handleEditPage}
              color="gray"
            >
              Edit
            </Button>
          </div>
        )}
        <div className={styles.content}>
          {page === null ? (
            <h1>Loading...</h1>
          ) : page !== false ? (
            <>
              <h1 className={styles.pageTitle}>{page.name}</h1>
              <DocProperties props={page.attributes} />
            </>
          ) : (
            <ActionBox
              title="Page data not found"
              desc="Page data does not exist, press create to make the page"
              action={handleEditPage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
