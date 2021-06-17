import React from "react";
import MainScreen from "./Screens/MainScreen";
import HomeScreen from "./Screens/HomeScreen";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Authenticate } from "./components/ContextApi/authentication";
import axios from "axios";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <Router>
      <Authenticate>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/main" component={MainScreen} />
        <Footer />
      </Authenticate>
    </Router>
  );
};

// const Routes = () => {
//   return (
//     <Switch>
//       <Route path="/" component={MainScreen} />
//       <Route path="/main" component={MainScreen} />
//     </Switch>
//   );
// };
export default App;
