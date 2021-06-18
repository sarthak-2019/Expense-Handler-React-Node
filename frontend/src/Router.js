import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainScreen from "./Screens/MainScreen";
import HomeScreen from "./Screens/HomeScreen";
import Footer from "./components/Footer/Footer";
import AuthContext from "./context/AuthContext";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        {loggedIn === false && (
          <Route exact path="/">
            <HomeScreen />
          </Route>
        )}
        {loggedIn === true && (
          <Route exact path="/main">
            <MainScreen />
          </Route>
        )}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
