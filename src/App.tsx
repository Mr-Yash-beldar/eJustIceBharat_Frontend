import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import DashBoard from './Dashboard';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import VerifyEmail from './pages/Authentication/VerifyEmail';
import CompleteProfile from './pages/CompleteProfile';
import DefaultLayout from './layout/DefaultLayout';
import AdvocateList from './pages/FindAdvocate/AdvocateList';
import AddCase from './pages/Cases/AddCase';
import ViewCaseTable from './pages/Cases/ViewCases';

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
          path="/auth/ResetPassword"
          element={
            <>
              <PageTitle title="ResetPassword | EjusticeBharat" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/auth/VerifyEmail"
          element={
            <>
              <PageTitle title="VerifyEmail | EjusticeBharat" />
              <VerifyEmail />
            </>
          }
        />

        {/* Wrap only the necessary dashboard routes in DefaultLayout */}
        <Route
          path="/dashboard/*"
          element={
            <DefaultLayout>
              <Routes>
                {/* This will load the main dashboard */}
                <Route
                  path="dashboard"
                  element={
                    <>
                      <PageTitle title="Dashboard | EjusticeBharat" />
                      <DashBoard />
                    </>
                  }
                />

                {/* This will load the complete profile */}
                <Route
                  path="CompleteProfile"
                  element={
                    <>
                      <PageTitle title="CompleteProfile | EjusticeBharat" />
                      <CompleteProfile />
                    </>
                  }
                />
                <Route
                  path="/FindAdvocates"
                  element={
                    <>
                      <PageTitle title="FindAdvocates | EJusticeBharat" />
                      <AdvocateList />
                    </>
                  }
                />

                <Route
                  path="/addCase"
                  element={
                    <>
                      <PageTitle title="AddCase | EJusticeBharat" />
                      <AddCase />
                    </>
                  }
                />

                <Route
                  path="/viewCase"
                  element={
                    <>
                      <PageTitle title="ViewCases | EJusticeBharat" />
                      <ViewCaseTable />
                    </>
                  }
                />
              </Routes>
            </DefaultLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
