import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainScreen from "./Screens/MainScreen";
import HomeScreen from "./Screens/HomeScreen";
import ExpenseScreen from "./Screens/ExpenseScreen";
import Footer from "./components/Footer/Footer";
import AuthContext from "./context/AuthContext";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        {loggedIn !== undefined ? (
          <React.Fragment>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/main">
              <MainScreen />
            </Route>
            <Route path="/main/expense/:id" component={ExpenseScreen} />
          </React.Fragment>
        ) : null}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
