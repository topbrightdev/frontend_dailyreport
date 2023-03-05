import React, { Suspense, useEffect } from "react"; 
import { BrowserRouter,  Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { Container } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store/store";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "components/Loader";
import { signinWithToken } from "store/modules/auth";
import Header from "./Header";
import Footer from './Footer';
import Sidebar from "./Sidebar";
import DailyReport from "containers/DailyReport";
import AllReport from "containers/AllReport";

const SigninPage = React.lazy(() => import("containers/Auth/SigninPage"));
const ChangeEmail = React.lazy(() => import("containers/Auth/ChangeEmail"));
const SignupPage = React.lazy(() => import("containers/Auth/SignupPage"));
const SignupPageVerify = React.lazy(
  () => import("containers/Auth/SignupPageVerify")
);
// const ErrorBoundary = React.lazy(() => import("components/ErrorBoundary"));

function Layouts() {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const dispatch = useAppDispatch();

  const init = async () => {
    const token = await AsyncLocalStorage.getItem("token");
    token !== null && dispatch(signinWithToken({ token: token }));
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAuth = () => {
    return (
      <Switch>
        <Route exact path="/signin" component={SigninPage}></Route>
        <Route exact path="/signup" component={SignupPage}></Route>
        <Route exact path="/signup/changeemail" component={ChangeEmail}></Route>
        <Route
          exact
          path="/signup/verify/:tokenId"
          component={SignupPageVerify}
        ></Route>
  
        <Redirect to="/signin" />
      </Switch>
    );
  };
  
  const renderMain = () => {
    return (
      <Switch>
        <Route exact path="/" component={DailyReport}></Route>
        <Route exact path="/all" component={AllReport}></Route>
        <Redirect to="/" />
      </Switch>
    );
  }; 

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
        {
              user?.id ? 
          <div
            style={{
              minHeight: "100vh", 
              maxHeight: "100vh",
              overflow: "auto",
              position: "relative",
              background: "#646363", 
            }}
          >
            
                <div> 
                  <Header /> 
                  <div className="maincontent" style={{ display: 'flex' }}>
                    <Sidebar />
                    {renderMain()}
                  </div>
                  <Footer />
                </div>
              
            
          </div> 
          : renderAuth()
        }
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default Layouts;