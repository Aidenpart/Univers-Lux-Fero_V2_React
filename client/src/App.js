import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Loading } from "./components/shared/loading/loading.js";

import { PageConnexion } from "./pages/authentification/pageLogin.js";
import { PageRegister } from "./pages/authentification/pageRegister.js";
import { PageProfil } from "./pages/authentification/pageProfil.js";
import { PageAdmin } from "./pages/adminSide/pageAdmin.js";
import { PageCRUDLieux } from "./pages/adminSide/encyclopedie/pageCRUDLieux.js";
import { PageOneLieu } from "./pages/adminSide/encyclopedie/pageOneLieu.js";
import { PageCRUDPersonnages } from "./pages/adminSide/encyclopedie/pageCRUDPersonnages.js";
import { PageOnePersonnage } from "./pages/adminSide/encyclopedie/pageOnePersonnage.js";
import { PageCRUDArticles } from "./pages/adminSide/articles/pageCRUDArticles.js";
import { PageOneArticle } from "./pages/adminSide/articles/pageOneArticle.js";
import { PageUsers } from "./pages/adminSide/articles/pageUsers.js";
import { PageAccueil } from "./pages/publicSide/pageAccueil.js";
import { PageAccueilEncyclopedie } from "./pages/publicSide/encyclopedie/pageAccueilEncyclopedie.js";
import { PageAccueilPersonnages } from "./pages/publicSide/encyclopedie/personnages/pageAccueilPersonnages.js";
import { PagePersonnages } from "./pages/publicSide/encyclopedie/personnages/pagePersonnages.js";
import { PagesLieux } from "./pages/publicSide/encyclopedie/lieux/pageLieux.js";
import { PageAccueilLieux } from "./pages/publicSide/encyclopedie/lieux/pageAccueilLieux.js";
import { PageBlog } from "./pages/publicSide/blog/pageBlog.js";
import { PageArticle } from "./pages/publicSide/blog/pageArticle.js";
import { PageMentionsLegales } from "./pages/publicSide/legal/pageMentionsLegales.js";
import { PageCGU } from "./pages/publicSide/legal/pageCGU.js";
import { PageRGPD } from "./pages/publicSide/legal/pageRGPD.js";


import { getUserbyToken } from "./helpers/authHelpers.js";
import { AuthMiddleware, AdminMiddleware } from "./middleware/authMiddleware.js";
import { addUser } from "./store/slice/userSlice";
import { PageTest } from "./pages/adminSide/encyclopedie/pageTest.js";


function App() {
  
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    if (!dataLoaded) {
      if (localStorage.getItem('jwt') && !user.isLogged) {
        const userTokenPromise = getUserbyToken();
        userTokenPromise
        .then(data => {
          dispatch(addUser(data));
          setDataLoaded(true);
        })
        .catch(err => {
          console.log(err);
        });
      }else
        setDataLoaded(true);
    }
  }, [dataLoaded, user.isLogged, dispatch]);
  
  if (!dataLoaded)
      return <Loading />;  

  return (
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/connexion" element={<PageConnexion />} />
        <Route path="/mentions-legales" element={<PageMentionsLegales />} />
        <Route path="/rgpd" element={<PageRGPD />} />
        <Route path="/cgu" element={<PageCGU />} />
        <Route path="/register" element={<PageRegister />} />
        <Route path="/blog" element={<PageBlog />} />
        <Route path="/blog/article/:id" element={<PageArticle />} />
        <Route path="/encyclopedie" element={<PageAccueilEncyclopedie />} />
        <Route path="/encyclopedie/accueil-lieux" element={<PageAccueilLieux />} />
        <Route path="/encyclopedie/accueil-lieux/lieux" element={<PagesLieux />} />
        <Route path="/encyclopedie/accueil-personnages" element={<PageAccueilPersonnages />} />
        <Route path="/encyclopedie/accueil-personnages/personnages" element={<PagePersonnages />} />
  
        <Route path="/profil" element={<AuthMiddleware> <PageProfil /> </AuthMiddleware>} />
        
        <Route path="/admin" element={<AdminMiddleware> <PageAdmin /> </AdminMiddleware>} />
        <Route path="/admin/tests" element={<AdminMiddleware> <PageTest /> </AdminMiddleware>} />
        <Route path="/admin/users" element={<AdminMiddleware> <PageUsers /> </AdminMiddleware>} />
        <Route path="/admin/CRUD-Personnages" element={<AdminMiddleware> <PageCRUDPersonnages />  </AdminMiddleware>} />
        <Route path="/admin/CRUD-Personnages/personnage/:id" element={<AdminMiddleware> <PageOnePersonnage /> </AdminMiddleware>} />
        <Route path="/admin/CRUD-Lieux" element={<AdminMiddleware> <PageCRUDLieux /> </AdminMiddleware>} />
        <Route path="/admin/CRUD-Lieux/lieu/:id" element={<AdminMiddleware> <PageOneLieu /> </AdminMiddleware>} />
        <Route path="/admin/CRUD-Articles" element={<AdminMiddleware> <PageCRUDArticles /> </AdminMiddleware>} />
        <Route path="/admin/CRUD-Articles/article/:id" element={<AdminMiddleware> <PageOneArticle /> </AdminMiddleware>} />
      </Routes>
  );
}

export default App;