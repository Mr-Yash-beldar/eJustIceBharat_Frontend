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
import ViewCasesAdv from './pages/Cases/ViewCasesAdv';

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
    <Routes>
      {/* Authentication Routes */}
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

      {/* Default Layout Routes */}
      <Route
        path="/dashboard/*"
        element={
          <DefaultLayout>
            <Routes>
              <Route
                path=""
                element={
                  <>
                    <PageTitle title="Dashboard | EjusticeBharat" />
                    <DashBoard />
                  </>
                }
              />
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
                path="FindAdvocates"
                element={
                  <>
                    <PageTitle title="FindAdvocates | EJusticeBharat" />
                    <AdvocateList />
                  </>
                }
              />
              <Route
                path="addCase"
                element={
                  <>
                    <PageTitle title="AddCase | EJusticeBharat" />
                    <AddCase />
                  </>
                }
              />
              <Route
                path="viewCase"
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

      {/* Advocate Layout Routes with isAdvocate Prop */}
      <Route
        path="/adv_dashboard/*"
        element={
          <DefaultLayout isAdvocate={true}>
            <Routes>
              <Route
                path=""
                element={
                  <>
                    <PageTitle title="Dashboard | EjusticeBharat" />
                    <DashBoard />
                  </>
                }
              />
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
                path="viewAdvocates"
                element={
                  <>
                    <PageTitle title="ViewAdvocates | EJusticeBharat" />
                    <AdvocateList />
                  </>
                }
              />
              <Route
                path="addCase"
                element={
                  <>
                    <PageTitle title="AddCase | EJusticeBharat" />
                    <AddCase />
                  </>
                }
              />
              <Route
                path="viewCase"
                element={
                  <>
                    <PageTitle title="ViewCases | EJusticeBharat" />
                    <ViewCaseTable />
                  </>
                }
              />
              <Route
                path="viewRequests"
                element={
                  <>
                    <PageTitle title="ViewRequests | EJusticeBharat" />
                    <ViewCasesAdv />
                  </>
                }
              />
            </Routes>
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;
