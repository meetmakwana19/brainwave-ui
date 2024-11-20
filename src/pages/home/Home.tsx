import { Icon, LeftNavigation, Tooltip } from "@contentstack/venus-components";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import RecentlyModified from "./RecentlyModified";
import { IMicroAppsObj } from "../../types/microAppObj";
import SharedWithMe from "./SharedWithMe";

interface IHomeProps {
  microAppsObj: IMicroAppsObj;
}
interface HeaderDataProps {
  title: string | React.ReactNode;
  actions: [];
  pageHeaderContent?: string | React.ReactNode;
}

interface INavigationData {
  title: React.ReactNode;
  onclick: () => void;
  id: string;
  headerData?: HeaderDataProps;
  component: React.ReactNode;
  icon: React.ReactNode;
  externalLink?: string;
  default?: boolean;
  link?: string;
  testId: string;
}

interface RouteParams {
  navigationID: string;
}

const Home: React.FC<IHomeProps> = (props) => {
  const path = props.microAppsObj.relativeUrl;
  const { navigationID } = useParams<RouteParams>();
  const history = useHistory();
  console.log("getting navigationID", navigationID);

  const navigationDataArray: INavigationData[] = [
    {
      component: <RecentlyModified />,
      default: navigationID === "recently-modified",
      headerData: {
        actions: [],
        title: (
          <>
            <Tooltip
              position="right"
              interactive={false}
              variantType="basic"
              content={"Learn More About Brainwave"}
              testId={"entries_page_header_learn_more"}
            ></Tooltip>
          </>
        ),
      },
      onclick: () => {
        history.push(`${path}/recently-modified`);
      },
      icon: <Icon icon="Stacks" version="v2" size="medium" />,
      id: "recently-modified",
      title: "Recently Modified",
      testId: "brand-kit-click-menu-settings-general",
    },
    {
      component: <SharedWithMe microAppsObj={props.microAppsObj} />,
      default: navigationID === "shared-with-me",
      testId: "brand-kit-click-menu-settings-collaborators",
      headerData: {
        actions: [], //keep this empty else you will get an empty button or TS errors
        title: (
          <>
            <Tooltip
              position="right"
              interactive={false}
              variantType="basic"
              content={"Learn More About Collaborator Settings"}
              testId={"entries_page_header_learn_more"}
            >
            </Tooltip>
          </>
        ),
      },
      onclick: () => {
        history.push(`${path}/shared-with-me`);
      },
      icon: <Icon icon="Users" version="v2" size="medium" />,
      id: "shared-with-me",
      title: "Shared with me",
    },
  ];

  const leftNavigationProps = {
    navigationData: navigationDataArray,
    navigationTitle: "Brainwave",
  };

  return (
    <>
      <LeftNavigation
        version="v2"
        leftNavVersion="v2"
        navigationProps={leftNavigationProps}
      />
    </>
  );
};

export default Home;
