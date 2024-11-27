import React from "react";
import Home from "./pages/home/Home";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./common/components/ErrorBoundary/PageNotFound";
import { IMicroAppsObj } from "./types/microAppObj";
import EditorPage from "./pages/editor";
import StackApp from "./pages/stack-app";
import { demoResponse } from "./common/utils/DemoResponse";

interface ILayout {
  microAppsObj: IMicroAppsObj;
}

const Layout: React.FC<ILayout> = (props) => {
  return (
    <>
      <div className="brainwave-routes">
        <Switch>
          <Route
            exact
            path={`${props.microAppsObj.relativeUrl}/stack-app-view`}
          >
            <StackApp data={demoResponse} onRowClick={() => {}} />
          </Route>

          <Route
            exact
            path={`${props.microAppsObj.relativeUrl}/create-new-wave`}
          >
            <EditorPage />
          </Route>

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
