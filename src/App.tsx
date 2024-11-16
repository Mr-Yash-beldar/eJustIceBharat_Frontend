import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignInOfficer from './CourtOfficerPages/Authentication/SigninCourtOfficer';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import VerifyEmail from './pages/Authentication/VerifyEmail';
import CompleteProfile from './pages/CompleteProfile/CompleteProfile';
import DefaultLayout from './layout/DefaultLayout';
import DefaultLayoutOfficer from './CourtOfficerPages/LayoutOfficer/DefaultLayoutOfficer';
import AdvocateList from './pages/FindAdvocate/AdvocateList';
import AddCase from './pages/Cases/AddCase';
// import ViewCaseTable from './pages/Cases/ViewCases';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import ProfileCompletionRoute from './ProtectedRoutes/ProfileCompletionRoute';
import CaseTable from './pages/PreTrial/JoinTable';
import LandingPage from './pages/LandingPage/LandingPage';
import { useAuth } from './context/AuthProvider';
import HomeCard from './pages/Home/HomeCard';
import CaseList from './AdvocatePages/RequestedCases/CaseList';
import ViewCasesAdvocate from './AdvocatePages/ViewCasesAdvocate/ViewCasesAdvocate';
import CompleteProfileAdvocate from './AdvocatePages/CompleteProfileAdvocate.tsx/CompleteProfileAdvocate';
import RegistrationTable from './AdvocatePages/CaseRegistrationCourt/RegistrationTable';
import AdvocateFeedbackPage from './pages/FeedbackAdvocate/AdvocateFeedbackPage';
import HomeCardAdvocate from './AdvocatePages/HomeAdvocate/HomeCardAdvocate';
// import Evidence from './AdvocatePages/EvidencePresentation/EvidencePresentation';
import FeedbackPage from './AdvocatePages/ViewFeedbacks/FeedbackPage';
import CaseListOfficer from './CourtOfficerPages/RequestedCasesOfficer/CaseListOfficer';
import ScheduleTable from './CourtOfficerPages/SchedulePreTrial/ScheduleTable';
import HomeCardOfficer from './CourtOfficerPages/OfficerHome/HomeCardOfficer';
import CaseFee from './pages/PayFees/CasesFees';

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
          path="/auth/signinOfficer"
          element={
            <div>
              <PageTitle title="Signin | EjusticeBharat" />
              <SignInOfficer />
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
                          <AdvocateFeedbackPage />
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
                          <CaseTable />
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
                          <CaseFee />
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
                          <HomeCardAdvocate />
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

                  <Route
                    path="ViewMyAcceptedCases"
                    element={
                      <>
                        <PageTitle title="AcceptedCases| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <ViewCasesAdvocate />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />

                  <Route
                    path="AdvocateCompleteProfile"
                    element={
                      <>
                        <PageTitle title="CompleteProfileAdvocate| EJusticeBharat" />

                        <CompleteProfileAdvocate />
                      </>
                    }
                  />

                  <Route
                    path="CaseRegistrationToCourt"
                    element={
                      <>
                        <PageTitle title="CaseRegistrationToCourt| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <RegistrationTable />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />

                  <Route
                    path="EvidencePresentation"
                    element={
                      <>
                        <PageTitle title="EvidencePresentation| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <HomeCard />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />

                  <Route
                    path="ViewFeedback"
                    element={
                      <>
                        <PageTitle title="ViewFeedbacks| EJusticeBharat" />
                        <ProfileCompletionRoute>
                          <FeedbackPage />
                        </ProfileCompletionRoute>
                      </>
                    }
                  />
                  <Route
                    path="RequestedCasesOfficer"
                    element={
                      <>
                        <PageTitle title="RequestedCases| EJusticeBharat" />

                        <CaseListOfficer />
                      </>
                    }
                  />

                  <Route
                    path="SchedulePreTrial"
                    element={
                      <>
                        <PageTitle title="SchedulePreTrial| EJusticeBharat" />

                        <ScheduleTable />
                      </>
                    }
                  />

                  <Route
                    path="OfficerHome"
                    element={
                      <>
                        <PageTitle title="OfficerHome| EJusticeBharat" />

                        <HomeCardOfficer />
                      </>
                    }
                  />
                </Routes>
              </DefaultLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <DefaultLayoutOfficer>
              <Routes>
                <Route
                  path="RequestedCasesOfficer"
                  element={
                    <>
                      <PageTitle title="RequestedCases| EJusticeBharat" />

                      <CaseListOfficer />
                    </>
                  }
                />
              </Routes>
            </DefaultLayoutOfficer>
          }
        />
      </Routes>
    </>
  );
}

export default App;
