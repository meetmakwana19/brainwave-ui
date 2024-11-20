import React from "react";
import Home from "./pages/home/Home";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./common/components/ErrorBoundary/PageNotFound";
import { IMicroAppsObj } from "./types/microAppObj";

interface ILayout {
  microAppsObj: IMicroAppsObj;
}

const Layout: React.FC<ILayout> = (props) => {
  return (
    <>
      <div className="brainwave-routes">
        <Switch>
          <Route exact path={["/", "/brainwave", "/brainwave/:navigationID"]}>
            <Home microAppsObj={props.microAppsObj} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Layout;
