import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import DashBoard from './Dashboard';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
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
import AdvocateFeedbackPage from './pages/FeedbackAdvocate/AdvocateFeedbackPage';
import PreTrialConferencingPage from './pages/PreTrial/PreTrailConferencingPage';
import PayFees from './pages/PayFees/PayFees';
import LandingPage from './pages/LandingPage/LandingPage';
import { useAuth } from './context/AuthProvider';
import HomeCard from './pages/Home/HomeCard';
import CaseList from './AdvocatePages/RequestedCases/CaseList';

function App() {
  const { pathname } = useLocation();
  const { loading } = useAuth();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <PageTitle title="Welcome | EjusticeBharat" />
              <LandingPage />
            </div>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <div>
              <PageTitle title="Signin | EjusticeBharat" />
              <SignIn />
            </div>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <div>
              <PageTitle title="Signup | EjusticeBharat" />
              <SignUp />
            </div>
          }
        />
        <Route
          path="/auth/ForgotPassword"
          element={
            <div>
              <PageTitle title="ForgotPassword | EjusticeBharat" />
              <ForgotPassword />
            </div>
          }
        />
        <Route
          path="/auth/ResetPassword"
          element={
            <div>
              <PageTitle title="ResetPassword | EjusticeBharat" />
              <ResetPassword />
            </div>
          }
        />
        <Route
          path="/auth/verifyemail/:id"
          element={
            <div>
              <PageTitle title="VerifyEmail | EjusticeBharat" />
              <VerifyEmail />
            </div>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Routes>
                  <Route
                    path="dashboard"
                    element={
                      <div>
                        <PageTitle title="Dashboard | EjusticeBharat" />
                        <DashBoard />
                      </div>
                    }
                  />
                  <Route
                    path="CompleteProfile"
                    element={
                      <div>
                        <PageTitle title="CompleteProfile | EjusticeBharat" />
                        <CompleteProfile />
                      </div>
                    }
                  />
                  <Route
                    path="FindAdvocates"
                    element={
                      <>
                        <PageTitle title="FindAdvocates | EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <AdvocateList />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                  <Route
                    path="addCase"
                    element={
                      <>
                        <PageTitle title="AddCase | EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <AddCase />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                  <Route
                    path="viewCase"
                    element={
                      <>
                        <PageTitle title="ViewCases | EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <ViewCaseTable />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                  <Route
                    path="feedbackAdvocate"
                    element={
                      <>
                        <PageTitle title="FeedBack Advocates | EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <AdvocateFeedbackPage />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                  <Route
                    path="preTrial"
                    element={
                      <>
                        <PageTitle title="PreTrial Conferencing | EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <PreTrialConferencingPage />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                  <Route
                    path="payFees"
                    element={
                      <>
                        <PageTitle title="Pay Fees| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <PayFees />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />

                  <Route
                    path="LitigantHome"
                    element={
                      <>
                        <PageTitle title="HomeLitigant| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <HomeCard />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />

                  <Route
                    path="advocateHome"
                    element={
                      <>
                        <PageTitle title="AdvocateHome| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <HomeCard />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />

                  <Route
                    path="requestedCases"
                    element={
                      <>
                        <PageTitle title="RequestedCases| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <CaseList />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                </Routes>
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
