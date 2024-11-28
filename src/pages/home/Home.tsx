import { Icon, LeftNavigation, Tooltip } from "@contentstack/venus-components";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { IMicroAppsObj } from "../../types/microAppObj";
import SharedWithMe from "./SharedWithMe";
import "./Home.css";
import DynamicTable from "./SexyDynamicTable/DynamicTable";
import CustomBigButton from "./CustomBigButton/CustomBigButton";
import { postDocument } from "../../api/document";

interface IHomeProps {
  microAppsObj: IMicroAppsObj;
}
interface HeaderDataProps {
  title: string | React.ReactNode;
  actions: { label: React.ReactNode; onClick: () => void; type: string }[];
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

  // Function to handle row click
  const handleRowClick = () => {
    history.push(`${path}/create-new-wave`);
    // You can perform any action here, such as navigating or showing details
    console.log("Row data:");
  };

  const handleButtonClick = (buttonName: string) => {
    console.log(`Button clicked: ${buttonName}`);
    alert(`Button clicked: ${buttonName}`);
  };
  const handleNewDocumentButtonClick = () => {
    const newDoc = {
      content: '{"title":"","document":[],"author":"Meet Makwana"}',
    };

    postDocument(newDoc)
      .then((response) => {
        console.log("Document created successfully", response);
      })
      .catch((error) => {
        console.error("Error in creating document", error);
      });
    history.push(`${path}/create-new-wave`);
  };

  const navigationDataArray: INavigationData[] = [
    {
      component: <DynamicTable onRowClick={handleRowClick} />,
      default: navigationID === "recently-modified",
      headerData: {
        actions: [],
        title: (
          <div className="brain-wave-table-header-wrapper">
            <div className="heading-for-table-text">Recent</div>
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <CustomBigButton
                label="New Document"
                icon={<Icon icon="NewTab" version="v2" size="small" />}
                onClick={() => handleNewDocumentButtonClick()}
                isActive={true} /* Set to true if active */
              />
              <CustomBigButton
                label="Templates"
                icon={<Icon icon="Layout" version="v2" size="small" />}
                onClick={() => handleButtonClick("Templates")}
                isActive={true} /* Set to true if active */
              />
              <CustomBigButton
                label="Import"
                icon={<Icon icon="Download" version="v2" size="small" />}
                onClick={() => handleButtonClick("Import")}
                isActive={false} /* Set to true if active */
              />
            </div>
          </div>
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
            ></Tooltip>
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
    <div className="home-table-brian-wave">
      <LeftNavigation
        version="v2"
        leftNavVersion="v2"
        // @ts-expect-error due to incompatible label type in actions
        navigationProps={leftNavigationProps}
      />
    </div>
  );
};

export default Home;
