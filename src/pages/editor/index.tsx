import {
  Button,
  ButtonGroup,
  PageHeader,
  PageLayout,
  Truncate,
} from "@contentstack/venus-components";
import React from "react";

const Editor: React.FC = () => {
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
      <div>
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
    <>
      <PageLayout
        type="edit"
        header={header}
        content={content}
        // rightSidebar={rightNav}
        footer={pageFooter}
      />{" "}
    </>
  );
};

export default Editor;
