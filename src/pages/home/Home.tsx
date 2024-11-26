import {
  Button,
  Icon,
  LeftNavigation,
  Tooltip,
} from "@contentstack/venus-components";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RecentlyModifiedTable from "./RecentlyModifiedTable/RecentlyModifiedTable";
import { IMicroAppsObj } from "../../types/microAppObj";
import SharedWithMe from "./SharedWithMe";
import "./Home.css";
import DynamicTable from "./SexyDynamicTable/DynamicTable";

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

interface TableItem {
  id: number;
  name: string;
  creator: string;
  lastViewed: string;
}

interface RouteParams {
  navigationID: string;
}

const Home: React.FC<IHomeProps> = (props) => {
  const path = props.microAppsObj.relativeUrl;
  const { navigationID } = useParams<RouteParams>();
  const history = useHistory();

  // const [data, setData] = useState<TableItem[]>([]);

  // useEffect(() => {
  //   // Example of backend data fetching
  //   const fetchData = async () => {
  //     const response = [
  //       { id: 1, name: 'Welcome to Zoom Docs', creator: 'Omsai Nagvekar', lastViewed: '11 minutes ago' },
  //       { id: 2, name: 'My Zoom Meeting', creator: 'Omsai Nagvekar', lastViewed: '28 minutes ago' },
  //     ];
  //     setData(response);
  //   };

  //   fetchData();
  // }, []);

  const response = [
    { id: 1, name: 'Welcome to Zoom Docs', creator: 'Omsai Nagvekar', lastViewed: '11 minutes ago' },
    { id: 2, name: 'My Zoom Meeting', creator: 'Omsai Nagvekar', lastViewed: '28 minutes ago' },
    { id: 3, name: 'Team Sync', creator: 'John Doe', lastViewed: '5 minutes ago' },
    { id: 4, name: 'Project Kickoff', creator: 'Jane Smith', lastViewed: '2 hours ago' },
    { id: 5, name: 'Product Roadmap', creator: 'Mark Johnson', lastViewed: '1 day ago' },
    { id: 6, name: 'Zoom Training', creator: 'Sarah Lee', lastViewed: '20 minutes ago' },
    { id: 7, name: 'Design Sprint', creator: 'Michael Brown', lastViewed: '3 hours ago' },
    { id: 8, name: 'Code Review', creator: 'Emily Davis', lastViewed: '15 minutes ago' },
    { id: 9, name: 'Marketing Strategy', creator: 'Jessica Harris', lastViewed: '30 minutes ago' },
    { id: 10, name: 'Sales Call', creator: 'David Clark', lastViewed: '1 hour ago' },
    { id: 11, name: 'Client Onboarding', creator: 'Patricia Walker', lastViewed: '45 minutes ago' },
    { id: 12, name: 'Budget Planning', creator: 'Chris Moore', lastViewed: '4 hours ago' },
    { id: 13, name: 'Product Launch', creator: 'Kimberly Taylor', lastViewed: '2 hours ago' },
    { id: 14, name: 'Staff Meeting', creator: 'James Anderson', lastViewed: '1 day ago' },
    { id: 15, name: 'Quarterly Review', creator: 'Robert White', lastViewed: '2 hours ago' },
    { id: 16, name: 'Customer Support Training', creator: 'Mary Adams', lastViewed: '12 minutes ago' },
    { id: 17, name: 'Tech Conference', creator: 'Patricia Baker', lastViewed: '3 hours ago' },
    { id: 18, name: 'Data Science Webinar', creator: 'Lucas Perez', lastViewed: '1 hour ago' },
    { id: 19, name: 'Weekly Standup', creator: 'Sandra Scott', lastViewed: '25 minutes ago' },
    { id: 20, name: 'Retrospective', creator: 'William Young', lastViewed: '1 day ago' },
    { id: 21, name: 'New Hire Orientation', creator: 'Olivia Nelson', lastViewed: '30 minutes ago' },
    { id: 22, name: 'Product Testing', creator: 'Joseph Carter', lastViewed: '2 hours ago' },
    { id: 23, name: 'Annual General Meeting', creator: 'Charlotte Mitchell', lastViewed: '4 hours ago' },
    { id: 24, name: 'SEO Strategy', creator: 'Sophia Robinson', lastViewed: '30 minutes ago' },
    { id: 25, name: 'User Feedback Session', creator: 'Benjamin Gonzalez', lastViewed: '1 hour ago' },
    { id: 26, name: 'Social Media Marketing', creator: 'Ethan Perez', lastViewed: '10 minutes ago' },
    { id: 27, name: 'Internal Training', creator: 'Mason Lewis', lastViewed: '3 hours ago' },
    { id: 28, name: 'Leadership Development', creator: 'Chloe Allen', lastViewed: '5 minutes ago' },
    { id: 29, name: 'Client Presentation', creator: 'Ava King', lastViewed: '2 hours ago' },
    { id: 30, name: 'Company Town Hall', creator: 'Liam Hall', lastViewed: '30 minutes ago' }
  ];
  

    // Function to handle row click
    const handleRowClick = () => {
      history.push(`${path}/create-new-wave`)
      // You can perform any action here, such as navigating or showing details
      console.log('Row data:');
    };

  const navigationDataArray: INavigationData[] = [
    {
      // component: <RecentlyModifiedTable microAppsObj={props.microAppsObj} />,
      component: <DynamicTable data={response} onRowClick={handleRowClick}/>,
      default: navigationID === "recently-modified",
      headerData: {
        actions: [
          
        ],
        title: (
          <>
            {/* <Tooltip
              position="right"
              interactive={false}
              variantType="basic"
              content={"Learn More About Brainwave"}
              testId={"entries_page_header_learn_more"}
            ></Tooltip> */}
            Gang
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
    <>
      <LeftNavigation
        version="v2"
        leftNavVersion="v2"
        // @ts-expect-error due to incompatible label type in actions
        navigationProps={leftNavigationProps}
      />
    </>
  );
};

export default Home;
