import Router from "@/components/Router";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./components/Loader";
import Layout from "./components/Layout";

function App() {
  const auth = getFirebaseAuth();
  const [isAuthentication, setIsAuthentication] = useState(!!auth?.currentUser);
  // auth 체크 전 loader 띄우는 용도
  const [init, setInit] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setInit(true);

      if (user) {
        return setIsAuthentication(true);
      }
      return setIsAuthentication(false);
    });
  }, [auth]);

  return (
    <Layout>
      {init ? <Router isAutherticated={isAuthentication} /> : <Loader />}
    </Layout>
  );
}

export default App;
