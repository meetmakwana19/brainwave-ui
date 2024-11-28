import {
  Button,
  PageHeader,
  PageLayout,
  Truncate,
  Dropdown,
  Icon,
} from "@contentstack/venus-components";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
import Editor from "./Editor";
import { IMicroAppsObj } from "../../types/microAppObj";
import CustomBigButton from "../home/CustomBigButton/CustomBigButton";
import { isEmpty } from "../../common/utils/utils";
import { fetchStacks, getSingleDocument } from "../../api/document";
import { TableItem } from "../../common/types";

interface ISelectedValue {
  label: string;
  value: string;
}

interface IBrandKit {
  brand_kit_uid: string;
  communication_style: {
    formality_level: number;
    tone: number;
    humor_level: number;
    complexity_level: number;
  };
  created_at: string;
  created_by: string;
  deleted_at: boolean;
  name: string;
  uid: string;
  updated_at: string;
  updated_by: string;
}

interface IEditorPage {
  microAppsObj: IMicroAppsObj;
}

const EditorPage: React.FC<IEditorPage> = (props) => {
  const path = props.microAppsObj.relativeUrl;
  const history = useHistory();
  const [voiceProfiles, setVoiceProfiles] = useState<IBrandKit[]>([]); // State to store voice profiles
  const [selectedVoiceProfile, setSelectedVoiceProfile] =
    useState<string>("Pick Writing Style"); // Track selected VP
  const [docTitle, setDocTitle] = useState("");
  const [docData, setDocData] = useState<TableItem>({} as TableItem);
  const { documentUid } = useParams<{ documentUid: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [stacksData, setStacksData] = useState<{ name: string; uid: string }[]>(
    []
  );
  const [checkedStacks, setCheckedStacks] = useState<Map<string, boolean>>(new Map());

  const [selectedStacks, setSelectedStacks] = useState<{ [key: string]: boolean }>({});


  // const [loading, setLoading] = useState<boolean>(false);
  const [isContentEmpty, setIsContentEmpty] = useState(true);

  const voiceProfileList = async () => {
    const url =
      "https://brand-kits-api.contentstack.com/v1/brand-kits/cs1bbc192ae13e41/voice-profiles?skip=0&limit=30&include_users=true&include_count=true&typeahead=&sort=updated_at&order=desc";

    const headers = {
      Accept: "*/*",
      "Accept-Language": "en-GB,en;q=0.8",
      authtoken: "blt20e8ed4a4abe1972",
      "If-None-Match": 'W/"398-B2Lmck5opfJd4gkqpCLDBiBjAj8"',
      organization_uid: "blt168737f46cfa411f",
      Origin: "https://app.contentstack.com",
      Priority: "u=1, i",
      Referer: "https://app.contentstack.com/",
      "sec-ch-ua": '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    };

    try {
      // setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Voice Profiles:", data?.voice_profiles);
      setVoiceProfiles(data?.voice_profiles || []);
    } catch (error) {
      console.error("Error fetching voice profiles:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    voiceProfileList();
  }, []);

  useEffect(() => {
    fetchStacks(props.microAppsObj).then((response) => {
      console.log("Stacks fetched successfully", response.stacks);
      setStacksData(response.stacks);
    });
  }, [props.microAppsObj]);

  useEffect(() => {
    setLoading(true);
    getSingleDocument(documentUid)
      .then((response) => {
        console.log("Document fetched successfully", response);
        setDocTitle(response.title);
        setDocData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetching document", error);
        setLoading(false);
      });
  }, [documentUid]);

  const handleVoiceProfileChange = (selectedValue: ISelectedValue) => {
    // const selectedProfile = voiceProfiles.find(
    //   (profile) => profile.uid === selectedValue
    // );
    const selectedVoiceProfile = selectedValue.label;
    setSelectedVoiceProfile(selectedVoiceProfile || "Pick Writing Style");
    console.log("Selected Voice Profile:", selectedValue);
    console.log("isContentEmpty", isContentEmpty);
  };

  const handleButtonClick = (buttonName: string) => {
    console.log(`Button clicked: ${buttonName}`);
  };
  const handleNewDocumentButtonClick = () => {
    history.push(`${path}/create-new-wave`);
  };

  const handleStackChange = (selectedStack: ISelectedValue) => {
    console.log("Selected Stack:", selectedStack);
    // You can use selectedStack.value (uid) for further actions or data fetching

    const isChecked = checkedStacks.get(selectedStack.value);

    setCheckedStacks((prevCheckedStacks) => {
      const updatedCheckedStacks = new Map(prevCheckedStacks);
      updatedCheckedStacks.set(selectedStack.value, !isChecked);
      return updatedCheckedStacks;
    });

    setSelectedStacks((prevSelectedStacks) => {
      // Toggle the checked state for the selected stack
      const isChecked = prevSelectedStacks[selectedStack.value] || false;
      return {
        ...prevSelectedStacks,
        [selectedStack.value]: !isChecked,
      };
    });


  };

  const getLabelWithCheck = (stack: { name: string; uid: string }) => {
    const isChecked = selectedStacks[stack.uid] || false;
    return isChecked ? `${stack.name} ✅` : stack.name;
  };

  const header = {
    component: (
      <PageHeader
        title={{
          label: (
            <div className="editor-heading">
              <Truncate truncateFrom="end" maxChar={32}>
                {isEmpty(docTitle) ? "Untitled Document" : docTitle}
              </Truncate>
            </div>
          ),
        }}
        actions={[
          {
            label: (
              <>
                <Dropdown
                  version="v2"
                  list={voiceProfiles.map((profile) => ({
                    label: profile.name,
                    value: profile.uid,
                  }))}
                  type="click"
                  withArrow={true}
                  highlightActive={true}
                  withSearch={true}
                  closeAfterSelect={true}
                  onChange={(selectedProfileUid: ISelectedValue) =>
                    handleVoiceProfileChange(selectedProfileUid)
                  } // Pass the function reference
                  // loading={loading} // Show loading state
                >
                  <Icon icon="BrandKitLogo" version="v2" size="medium" />
                  <div className="dropdown-label">{selectedVoiceProfile}</div>
                </Dropdown>

                <Dropdown
                  version="v2"
                  list={stacksData.map(
                    (stack: { name: string; uid: string }) => ({
                      label: getLabelWithCheck(stack), // Display the name of the stack
                      value: stack.uid, // Store the stack UID as the value
                    })
                  )}
                  type="click"
                  withArrow={true}
                  highlightActive={true}
                  withSearch={true}
                  closeAfterSelect={true}
                  onChange={handleStackChange} // Pass the function to handle selection
                  className="stack-dropdown"
                >
                  <Icon icon="Stacks" version="v2" size="medium" />
                  <div className="dropdown-label">Connect Stack</div>
                </Dropdown>

                <Button version="v2" buttonType="tertiary" icon="v2-Lock">
                  Share
                </Button>

                {/* <Button version="v2" buttonType="primary">
                  Connect
                </Button> */}
              </>
            ),
          },
        ]}
      />
    ),
    backNavigation: () => history.goBack(),
  };

  const content = {
    component: loading ? (
      <>Loading</>
    ) : (
      <div className="editor-container">
        <Editor
          isContentEmpty={isContentEmpty}
          setIsContentEmpty={setIsContentEmpty}
          docTitle={docTitle}
          setDocTitle={setDocTitle}
          docData={docData}
        />
        <div
          className={`${
            isContentEmpty
              ? "editor-bottom-button-container"
              : "editor-bottom-button-container-closing"
          }`}
        >
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
  };

  // const pageFooter = {
  //   component: <div className="editor-footer"></div>,
  // };

  return (
    <div className="editor-page-layout">
      <PageLayout
        type="edit"
        header={header}
        content={content}
        // rightSidebar={rightNav}
        // footer={pageFooter}
      />{" "}
    </div>
  );
};

export default EditorPage;
