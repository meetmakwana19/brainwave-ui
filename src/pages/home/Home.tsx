import {
  cbModal,
  Icon,
  LeftNavigation,
  Notification,
  Tooltip,
} from "@contentstack/venus-components";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IMicroAppsObj } from "../../types/microAppObj";
import SharedWithMe from "./SharedWithMe";
import "./Home.css";
import DynamicTable from "./SexyDynamicTable/DynamicTable";
import CustomBigButton from "./CustomBigButton/CustomBigButton";
import { getAllDocuments, postDocument } from "../../api/document";
import { TableItem } from "../../common/types";
import { ModalProps } from "@contentstack/venus-components/build/components/Modal/Modal";
import TemplateModal from "./modals/TemplateModal";
import { RootState, store } from "../../store";
import { Provider, useSelector } from "react-redux";

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
  const [documentData, setDocumentData] = useState<TableItem[]>([]);
  const [changePage, setChangePage] = useState<boolean>(false);
  const path = props.microAppsObj.relativeUrl;
  const { navigationID } = useParams<RouteParams>();
  const history = useHistory();

  const newDocId = useSelector((state: RootState) => state.common.tempDocUID);

  useEffect(() => {
    getAllDocuments().then((data) => {
      setDocumentData(data);
    });
  }, []);

  useEffect(() => {
    if (changePage) {
      history.push(`${path}/wave-editor/${newDocId}`);
    }
  }, [changePage, newDocId, history, path]);

  const handleButtonClick = (buttonName: string) => {
    console.log(`Button clicked: ${buttonName}`);

    cbModal({
      component: (props: ModalProps) => (
        <>
          <Provider store={store}>
            <TemplateModal
              closeModal={props.onClose}
              setChangePage={setChangePage}
              {...props}
            />
          </Provider>
        </>
      ),
      modalProps: {
        size: "max",
        customClass: "template-modal",
      },
    });
  };
  const handleNewDocumentButtonClick = async () => {
    const newDoc = {
      content: '{"title":"","document":[],"author":"Meet Makwana"}',
    };

    let newDocId = 0;

    await postDocument(newDoc)
      .then((response) => {
        console.log("Document created successfully", response);
        newDocId = response.uid;
      })
      .catch((error) => {
        console.error("Error in creating document", error);
      });

    if (newDocId) {
      history.push(`${path}/wave-editor/${newDocId}`);
    } else {
      Notification({
        type: "error",
        notificationContent: {
          text: "Navigation to the editor is skipped as 'uid' is unavailable.",
        },
        notificationProps: { hideProgressBar: true, autoClose: true },
      });
    }
  };

  const handleRowClick = (item: TableItem) => {
    history.push(`${path}/wave-editor/${item.uid}`);
    console.log("Row data:", item);
  };

  const navigationDataArray: INavigationData[] = [
    {
      component: (
        <DynamicTable data={documentData} onRowClick={handleRowClick} />
      ),
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
