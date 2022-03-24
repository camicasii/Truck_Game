import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes";
import Web3Context from "../context/Web3Context";
import { useContext} from "react";

const AppRouter = () => {
  const { accounts, isLoaded } = useContext(Web3Context);
  return (
    <Router>
      
      <div>
      
        <Switch>
        
          <Route path="/" component={DashboardRoutes} />
        </Switch>
      </div>
    </Router>
  );
};
export default AppRouter;
