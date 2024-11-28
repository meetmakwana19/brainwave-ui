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
import { useHistory } from "react-router-dom";
import Editor from "./Editor";

interface ISelectedValue {
  label: string;
  value: string;
}

const EditorPage: React.FC = () => {
  const history = useHistory();
  const [voiceProfiles, setVoiceProfiles] = useState<any[]>([]); // State to store voice profiles
  const [selectedVoiceProfile, setSelectedVoiceProfile] = useState<string>("Pick Writing Style"); // Track selected VP
  // const [loading, setLoading] = useState<boolean>(false);

  const voiceProfileList = async () => {
    const url =
      "https://brand-kits-api.contentstack.com/v1/brand-kits/cs1bbc192ae13e41/voice-profiles?skip=0&limit=30&include_users=true&include_count=true&typeahead=&sort=updated_at&order=desc";

    const headers = {
      "Accept": "*/*",
      "Accept-Language": "en-GB,en;q=0.8",
      "authtoken": "blt20e8ed4a4abe1972",
      "If-None-Match": 'W/"398-B2Lmck5opfJd4gkqpCLDBiBjAj8"',
      "organization_uid": "blt168737f46cfa411f",
      "Origin": "https://app.contentstack.com",
      "Priority": "u=1, i",
      "Referer": "https://app.contentstack.com/",
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

  const handleVoiceProfileChange = (selectedValue: ISelectedValue) => {
    // const selectedProfile = voiceProfiles.find(
    //   (profile) => profile.uid === selectedValue
    // );
    const selectedVoiceProfile = selectedValue.label
    setSelectedVoiceProfile(selectedVoiceProfile || "Pick Writing Style");
    console.log("Selected Voice Profile:", selectedValue);
  };

  const header = {
    component: (
      <PageHeader
        title={{
          label: (
            <div className="editor-heading">
              <Truncate truncateFrom="end" maxChar={32}>
                Untitled Wave
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
                  onChange={(selectedProfileUid: string) => handleVoiceProfileChange(selectedProfileUid)} // Pass the function reference
                  // loading={loading} // Show loading state
                >
                  <Icon icon="BrandKitLogo" version="v2" size="medium" />
                  <div className="dropdown-label">{selectedVoiceProfile}</div>
                </Dropdown>
                <Button version="v2" buttonType="tertiary" icon="v2-Lock">
                  Share
                </Button>
                <Button version="v2" buttonType="primary">
                  Connect
                </Button>
              </>
            ),
          },
        ]}
      />
    ),
    backNavigation: () => history.goBack(),
  };

  const content = {
    component: (
      <div>
        <Editor />
      </div>
    ),
  };

  const pageFooter = {
    component: <div className="editor-footer"></div>,
  };

  return (
    <div className="editor-page-layout">
      <PageLayout
        type="edit"
        header={header}
        content={content}
        // rightSidebar={rightNav}
        footer={pageFooter}
      />{" "}
    </div>
  );
};

export default EditorPage;
