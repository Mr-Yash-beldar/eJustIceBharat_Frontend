import { useEffect } from 'react';
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
import ProtectedRoute from './components/ProtectedRoute';
import ProfileCompletionRoute from './components/ProfileCompletionRoute';
import { useAuth } from './context/AuthProvider';

function App() {
  const { pathname } = useLocation();
  const { loading } = useAuth(); // Using loading from AuthProvider

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show loader while loading
  if (loading) {
    return <Loader />;
  }

  // Routes only render after loading completes
  return (
    <>
      <Routes>
        <Route path="/auth/signin" element={<><PageTitle title="Signin | EjusticeBharat" /><SignIn /></>} />
        <Route path="/auth/signup" element={<><PageTitle title="Signup | EjusticeBharat" /><SignUp /></>} />
        <Route path="/auth/ForgotPassword" element={<><PageTitle title="ForgotPassword | EjusticeBharat" /><ForgotPassword /></>} />
        <Route path="/auth/ResetPassword" element={<><PageTitle title="ResetPassword | EjusticeBharat" /><ResetPassword /></>} />
        <Route path="/auth/verifyemail/:id" element={<><PageTitle title="VerifyEmail | EjusticeBharat" /><VerifyEmail /></>} />

        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DefaultLayout>
              <Routes>
                <Route path="dashboard" element={<><PageTitle title="Dashboard | EjusticeBharat" /><DashBoard /></>} />
                <Route path="CompleteProfile" element={<><PageTitle title="CompleteProfile | EjusticeBharat" /><CompleteProfile /></>} />
                <Route path="FindAdvocates" element={<ProfileCompletionRoute><><PageTitle title="FindAdvocates | EJusticeBharat" /><AdvocateList /></></ProfileCompletionRoute>} />
                <Route path="addCase" element={<ProfileCompletionRoute><><PageTitle title="AddCase | EJusticeBharat" /><AddCase /></></ProfileCompletionRoute>} />
                <Route path="viewCase" element={<ProfileCompletionRoute><><PageTitle title="ViewCases | EJusticeBharat" /><ViewCaseTable /></></ProfileCompletionRoute>} />
              </Routes>
            </DefaultLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
