import {
  ButtonGroup,
  FieldLabel,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Notification,
  TextInput,
} from "@contentstack/venus-components";
import React, { useState } from "react";
import "./PromptModal.css";
import AIIcon from "../../../common/components/AIIcon";
import { postDocument } from "../../../api/document";
import { generateSimpleUID } from "../../../common/utils/utils";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import { updateTempDocUID } from "../../../store/slice/commonSlice";

interface IPromptModal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: ((data: any) => void) | undefined;
  setChangePage: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedContentType: any;
}
const PromptModal: React.FC<IPromptModal> = (props) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const microAppsObj = useSelector(
    (state: RootState) => state.common.microAppsObj
  );

  console.log("microAppsObj in modal ", microAppsObj);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const postTemplate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/generate-from-template`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: prompt,
            content_type: JSON.stringify(props.fetchedContentType),
          }),
        }
      );
      let data = await response.json();
      data = JSON.parse(data);
      data = data.document;

      console.log("Successfull generated template ----  ", data);

      const docContent = {
        title: "",
        document: [
          {
            type: data[0].type,
            uid: generateSimpleUID(),
            children: data[0].children,
          },
        ],
        author: "Meet Makwana",
      };

      const docPayload = {
        content: JSON.stringify(docContent),
      };

      let newDocId = "";

      await postDocument(docPayload)
        .then((response) => {
          console.log("Document created successfully from template ", response);
          newDocId = response.uid;
          props.setChangePage(true);
        })
        .catch((error) => {
          console.error("Error in creating document from template", error);
        });

      if (newDocId) {
        store.dispatch(updateTempDocUID(newDocId));
        setLoading(false);
        if (props.closeModal) {
          props.closeModal(prompt);
        }
        // props.history.push(`${microAppsObj.relativeUrl}/wave-editor/${newDocId}`);
      } else {
        setLoading(false);

        Notification({
          type: "error",
          notificationContent: {
            text: "Navigation to the editor from template is skipped as 'uid' is unavailable.",
          },
          notificationProps: { hideProgressBar: true, autoClose: true },
        });
      }
    } catch (error) {
      setLoading(false);

      console.error("Error in postTemplate", error);
    }
  };

  return (
    <>
      <ModalHeader
        version="v2"
        title="New Brainwave"
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
            className={`custom-gradient-button ${loading ? "custom-gradient-button-loading" : ""}`}
            onClick={() => {
              postTemplate();
            }}
          >
            <AIIcon />
            {loading ? "" : "\u00A0 Generate"}
          </button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

export default PromptModal;
