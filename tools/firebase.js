import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, getDocs, collection, setDoc, deleteDoc } from 'firebase/firestore';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAv8x1kppqKEFtYTcVeBtJYuqHUIeV_DQo',
  authDomain: 'simulation-js-so.firebaseapp.com',
  projectId: 'simulation-js-so',
  storageBucket: 'simulation-js-so.appspot.com',
  messagingSenderId: '257519458988',
  appId: '1:257519458988:web:0f7649797ac176e1755d09',
  measurementId: 'G-EYLH3530ZY'
};

initializeApp(config);
const db = getFirestore();
const auth = getAuth();

export const signIn = async () => {
  await setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAuthObject = () => {
  return auth;
};

export const signOut = () => {
  auth.signOut();
};

export const checkIsAdmin = async (user) => {
  const admins = await getDoc(doc(db, 'admins', 'uids'));
  const uids = admins.data().uids;
  return uids.includes(user.uid);
};

export const getTabs = async () => {
  const dbTabs = await getDocs(collection(db, 'tabs'));
  let tabs = [];
  dbTabs.forEach((tab) => {
    const obj = tab.data();
    tabs.push(obj);
  });
  return tabs;
};

const filterPaths = (paths) => {
  let copy = [...paths];
  let contained = [];
  let newPaths = [];
  for (let i = 0; i < copy.length; i++) {
    if (!contained.includes(copy[i].path)) {
      contained.push(copy[i].path);
      newPaths.push(copy[i]);
    }
  }
  return newPaths;
};

export const improveName = (name) => {
  return name
    .replace(/\-/g, ' ')
    .split(' ')
    .map((item) => {
      item = item[0].toUpperCase() + item.substring(1);
      return item;
    })
    .join(' ');
};

const parseToPaths = (name, paths) => {
  let newPaths = paths.map((path) => {
    const obj = {
      isPath: true,
      show: improveName(path.name),
      path: `/${path.path}`
    };
    return obj;
  });
  newPaths = filterPaths(newPaths);
  const obj = {
    show: name,
    paths: newPaths
  };
  return obj;
};

export const createGroup = async (name, docs, fromInputs = false) => {
  const tabDocs = await getDocs(collection(db, 'tabs'));
  let tabs = [];
  tabDocs.forEach((tab) => {
    tabs.push(tab);
  });
  const newPaths = fromInputs ? parseToPaths(name, docs) : docs;
  await setDoc(doc(db, 'tabs', name), newPaths);
};

export const getGroup = async (name) => {
  const groupDoc = await getDoc(doc(db, 'tabs', name));
  if (groupDoc.exists()) {
    const data = groupDoc.data();
    return data;
  } else return null;
};

export const deleteTabFromDropdown = async (dropdownName, path) => {
  let group = await getDoc(doc(db, 'tabs', dropdownName));
  group = group.data();
  group.paths.splice(group.paths.indexOf(group.paths.find((el) => el.path == path)), 1);
  await setDoc(doc(db, 'tabs', dropdownName), group);
};

export const deleteGroup = async (name) => {
  await deleteDoc(doc(db, 'tabs', name));
};

export const getPage = async (dir) => {
  if (dir[0] == '/') dir = dir.substring(1);
  const page = await getDoc(doc(db, 'pages', dir));
  if (!page.exists()) return null;
  return page.data();
};

export const renameGroup = async (prevName, newName) => {
  if (prevName === newName) return;
  const groupDoc = await getGroup(prevName);
  groupDoc.show = newName;
  await createGroup(newName, groupDoc);
  await deleteGroup(prevName);
};

export const renameDoc = async (prevName, newName, parentName) => {
  const groupDoc = await getGroup(parentName);
  groupDoc.paths = groupDoc.paths.map((path) => {
    if (path.show === prevName) {
      path.show = improveName(newName);
      return path;
    }
    return path;
  });
  await setDoc(doc(db, 'tabs', parentName), groupDoc);
};

export const getTabInfoFromPath = async (path) => {
  console.log(path);
  const tabs = await getTabs();
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].isPath) {
      if (tabs[i].path === `/${path}`) return tabs[i].show;
    } else {
      for (let j = 0; j < tabs[i].paths.length; j++) {
        const p = tabs[i].paths[j];
        if (p.path === `/${path}`) return p.show;
      }
    }
  }
  return null;
};

export const savePage = async (name, attributes, pathname) => {
  await setDoc(doc(db, 'pages', pathname), { attributes, name });
};

export const createObjectDocPage = async (name, path) => {
  await setDoc(doc(db, 'tabs', name), {
    isPath: true,
    show: name,
    path
  });
};

export const deleteObjectDoc = async (name, path) => {
  let tab = await getDoc(doc(db, 'tabs', name));
  tab = tab.data();
  console.log(tab);
  if (tab.show === name && tab.path === path) {
    await deleteDoc(doc(db, 'tabs', name));
  } else {
    console.log('invalid doc to delete');
  }
};
