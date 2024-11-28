import {
  ButtonGroup,
  FieldLabel,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "@contentstack/venus-components";
import React, { useState } from "react";
import "./PromptModal.css";
import AIIcon from "../../../common/components/AIIcon";

interface IPromptModal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: ((data: any) => void) | undefined;
}
const PromptModal: React.FC<IPromptModal> = (props) => {
  const [prompt, setPrompt] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  return (
    <>
      <ModalHeader
        version="v2"
        title="Prompt Modal"
        closeModal={props.closeModal}
      />
      <ModalBody>
        <FieldLabel htmlFor="prompt" version="v2" required>
          Share a keyword or phrase to get started
        </FieldLabel>
        <TextInput
          name="prompt"
          version="v2"
          width="full"
          required={true}
          placeholder="Enter a query"
          onChange={handleChange}
          value={prompt}
        />
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <button
            className="custom-gradient-button"
            onClick={() => {
              if (props.closeModal) {
                props.closeModal(prompt);
              }
            }}
          >
            <AIIcon />
            Generate
          </button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

export default PromptModal;
