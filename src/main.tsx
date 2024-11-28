import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
import { createBrowserHistory, History, LocationState } from "history";
import { IMicroAppsObj } from "./types/microAppObj.ts";
import { ErrorBoundary } from "./common/components/ErrorBoundary/index.tsx";
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { updateMicroAppObj } from "./store/slice/commonSlice.ts";

declare global {
  interface Window {
    renderBrandKit: (
      containerId?: string,
      // histroy?: History,
      history?: History<LocationState>, // typing it as `any` makes the history prop work on the Router component.
      microAppsObj?: IMicroAppsObj
    ) => void;
  }
}

window.renderBrandKit = (
  containerId = "root",
  history = createBrowserHistory(),
  microAppsObj = {
    relativeUrl: "/brainwave",
    leftsidebarContainerDom: "apps-sidebar-container",
    headerContainerDom: "orgHeaderDropdown",
    org_uid: null,
    token: null,
    currentUser: {
      authtoken: import.meta.env.VITE_USER_AUTH_TOKEN,
      uid: import.meta.env.VITE_USER_UID,
      organizations: [
        {
          uid: "",
          name: "CSI Services",
          org_roles: [
            {
              admin: false,
              name: "member",
            },
          ],
        },
        {
          uid: import.meta.env.VITE_ORGINISATION_UID,
          name: "Brand Kit Testing",
          org_roles: [
            {
              admin: true,
              name: "admin",
            },
          ],
          is_owner: false,
        },
      ],
      roles: [
        {
          name: "Admin",
        },
        {
          // name: "Developer",
        },
        {
          // name: "Content Manager",
        },
      ],
    },
    currentOrganization: {
      uid: import.meta.env.VITE_ORGINISATION_UID,
      name: import.meta.env.VITE_ORGINISATION_NAME,
      owner_uid: import.meta.env.VITE_ORGINISATION_OWNER_UID,
      org_roles: [
        {
          admin: true,
        },
      ],
    },
    project_id: "12345678",
    stacks: [
      // {
      //   api_key: "32313131",
      //   name: "Sample Gen AI",
      // },
      // {
      //   api_key: "02280180",
      //   name: "Sample Meet stack",
      // }
    ],
  }
) => {
  store.dispatch(updateMicroAppObj(microAppsObj));

  // ReactDOM.createRoot(document.getElementById(containerId)!).render(
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
      <Router history={history}>
        <App microAppsObj={microAppsObj} />
      </Router>
      </Provider>
    </ErrorBoundary>,
    document.getElementById(containerId)
  );
};
