import React from "react";
import MainScreen from "./Screens/MainScreen";
import HomeScreen from "./Screens/HomeScreen";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <MainScreen />
      <Footer />
    </div>
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
