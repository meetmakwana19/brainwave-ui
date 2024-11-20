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

const Editor: React.FC = () => {
  const history = useHistory();

  const header = {
    component: (
      <PageHeader
        title={{
          label: (
            <div>
              <Truncate truncateFrom="end" maxChar={32}>
                Untitled Wave
              </Truncate>
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
        <h1>Editor</h1>
      </div>
    ),
  };

  const pageFooter = {
    component: (
      <div className="editor-footer">
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

export default Editor;
