import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const Authenticate = (props) => {
  const [auth, setauth] = useState(true);
  const authhandler = (props) => {};
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
