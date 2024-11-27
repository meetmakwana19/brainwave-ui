import {
  Button,
  ButtonGroup,
  PageHeader,
  PageLayout,
  Truncate,
} from "@contentstack/venus-components";
import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import Editor from "./Editor";

const EditorPage: React.FC = () => {
  const history = useHistory();

  const header = {
    component: (
      <PageHeader
        title={{
          label: (
            <div className="editor-heading">
              <Truncate truncateFrom="end" maxChar={32}>
                Untitled Wave
              </Truncate>

              <ButtonGroup>
                <Button version="v2" buttonType="tertiary" icon="v2-Lock">
                  Share
                </Button>
                <Button version="v2" buttonType="primary">
                  Connect
                </Button>
              </ButtonGroup>
            </div>
          ),
        }}
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
