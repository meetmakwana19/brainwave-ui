import React from "react";
import Home from "./pages/home/Home";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./common/components/ErrorBoundary/PageNotFound";
import { IMicroAppsObj } from "./types/microAppObj";
import EditorPage from "./pages/editor";
import StackApp from "./pages/stack-app";
import { useHistory } from "react-router-dom";
import StackEditor from "./pages/stack-editor";

interface ILayout {
  microAppsObj: IMicroAppsObj;
}


const Layout: React.FC<ILayout> = (props) => {
  const history = useHistory();
  
  const handleRowClick = () => {
    history.push(`${path}/stack-create-new-wave`)
    console.log(handleRowClick);
  };
  const path = props.microAppsObj.relativeUrl;
  
  return (
    <>
      <div className="brainwave-routes">
        <Switch>
          <Route
            exact
            path={`${props.microAppsObj.relativeUrl}/stack-app-view`}
          >
            <StackApp onRowClick={handleRowClick} viewMode={true} />
          </Route>

          <Route
            exact
            path={`${props.microAppsObj.relativeUrl}/stack-create-new-wave`}
          >
            <StackEditor />
          </Route>

          <Route
            exact
            path={`${props.microAppsObj.relativeUrl}/wave-editor/:documentUid`}
          >
            <EditorPage microAppsObj={props.microAppsObj} />
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
