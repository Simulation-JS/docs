import { getAuthObject, checkIsAdmin } from '../../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import homeStyles from '../../styles/Home.module.css';
import Loading from '../Loading';
import ErrorScreen from '../ErrorScreen';

export default function AdminSiteWrapper({ children }) {
  const auth = getAuthObject();
  const [user, loading, error] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        const isAdmin = await checkIsAdmin(user);
        setAdmin(isAdmin);
        setHasResponse(true);
      } else {
        if (!loading) {
          setHasResponse(true);
        }
      }
    })();
  }, [user]);

  return hasResponse ? (
    admin ? (
      children
    ) : (
      <ErrorScreen>You do not have access to this page.</ErrorScreen>
    )
  ) : (
    <div className={`${homeStyles.fullForce} ${homeStyles.center}`}>
      <Loading />
    </div>
  );
}
