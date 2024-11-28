import { ModalBody, ModalHeader } from "@contentstack/venus-components";
import React from "react";

interface ITemplateModal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: ((data: any) => void) | undefined;
}
const TemplateModal: React.FC<ITemplateModal> = (props) => {
  return (
    <>
      <ModalHeader
        version="v2"
        title={<>Templates</>}
        closeModal={props.closeModal}
      />
      <ModalBody version="v2">
        <h1>body</h1>
      </ModalBody>
    </>
  );
};

export default TemplateModal;
