import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import DashBoard from './Dashboard';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* Routes outside of DefaultLayout */}
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | EjusticeBharat" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | EjusticeBharat" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/ForgotPassword"
          element={
            <>
              <PageTitle title="ForgotPassword | EjusticeBharat" />
              <ForgotPassword />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | EjusticeBharat" />
              <DashBoard />
            </>
          }
        />

          <Route
          path="/auth/ResetPassword"
          element={
            <>
              <PageTitle title="ResetPassword | EjusticeBharat" />
              <ResetPassword />
            </>
          }
        />  

      </Routes>

      {/* Routes inside DefaultLayout */}
         </>
  );
}

export default App;
