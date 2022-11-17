import styles from '../styles/Home.module.css';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import { checkIsAdmin, getAuthObject } from '../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import Code from '../components/Code';
import Head from 'next/head';

export default function Home() {
  const auth = getAuthObject();
  const [user, loading, error] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        const isAdmin = await checkIsAdmin(user);
        setAdmin(isAdmin);
      }
    })();
  }, [user]);

  return (
    <>
      <Head>
        <title>SimulationJS Docs</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta
          name="description"
          content="Documentation for the SimulationJS graphics library. Developed by Jackson Otto."
        />
      </Head>
      <div className={styles.container}>
        <Sidebar admin={admin} />
        <main className={styles.full}>
          <Header
            user={user}
            userLoading={loading}
            admin={admin}
          />
          <div className={styles.content}>
            <h1 className={styles.pageTitle}>Getting Started</h1>
            <section>
              Simulation.js is a simple graphics library for making simple shapes, animations, and of course,
              simulations.
            </section>
            <article className={styles.contentSection}>
              <section>
                To use simulation.js in your site, include the simulation.js file into the body tag, or the
                head tag with the defer prop of your html file like this.
              </section>
              <Code language="html">
                {`<head>
    <script src="simulation.js" defer></script>
</head>`}
              </Code>
              <span>
                The Simulation.js source code can be found at the GitHub link{' '}
                <a
                  className={styles.link}
                  href="https://github.com/Simulation-JS/Simulation-JS"
                >
                  Simulation.js
                </a>
              </span>
            </article>
            <section>
              Check the Simulation tab on the right to find more information on creating a Simulation canvas
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
