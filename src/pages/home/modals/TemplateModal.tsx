import {
  cbModal,
  ModalBody,
  ModalHeader,
} from "@contentstack/venus-components";
import React, { useEffect, useState } from "react";
import "./TemplateModal.css";
import templateImage from "./image.png"; // Import the uploaded image
import { ModalProps } from "@contentstack/venus-components/build/components/Modal/Modal";
import PromptModal from "./PromptModal";
import { Provider } from "react-redux";
import { store } from "../../../store";

interface ITemplateModal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: ((data: any) => void) | undefined;
  setChangePage: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateModal: React.FC<ITemplateModal> = (props) => {
  const newSetChangePage = props.setChangePage;

  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "Product Requirement Document",
      description:
        "Captures key project details, goals, and functional requirements for a product.",
    },
    {
      id: 2,
      title: "Performance Review Meeting",
      description:
        "Facilitates feedback and evaluation of employee performance for improvements.",
    },
    {
      id: 3,
      title: "Project Progress Sync",
      description:
        "Tracks milestones, updates, and deliverables for ongoing projects.",
    },
    {
      id: 4,
      title: "Product Launch Brief",
      description:
        "Outlines the plan and strategy for a successful product launch.",
    },
    {
      id: 5,
      title: "Meeting Notes",
      description:
        "Keeps a record of discussions, decisions, and outcomes from meetings.",
    },
  ]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/templates`
        );
        const data = await response.json();
        console.log(data);

        // Assuming that the data structure from the response is similar to the one you provided
        const newTemplate = {
          id: 7, // Unique id for the new template, you may want to adjust this if needed
          title: data[0]?.content_type?.title || "New Template", // Title from the fetched data
          description:
            data[0]?.content_type?.description || "New Template Description", // Description from the fetched data
        };

        setTemplates((prevTemplates) => [newTemplate, ...prevTemplates]);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateClick = async () => {
    // Close the Templates modal
    if (props.closeModal) {
      await props.closeModal({});
    }

    cbModal({
      component: (props: ModalProps) => (
        <>
          <Provider store={store}>
            <PromptModal
              closeModal={props.onClose}
              setChangePage={newSetChangePage}
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
  return (
    <>
      <ModalHeader
        version="v2"
        title={<>Templates</>}
        closeModal={props.closeModal}
      />
      <ModalBody version="v2">
        <div className="templates-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-tile"
              onClick={handleTemplateClick}
            >
              <img
                src={templateImage}
                alt="Template"
                className="template-image"
              />
              <div className="template-title">{template.title}</div>
              <div className="template-description">{template.description}</div>
            </div>
          ))}
        </div>
      </ModalBody>
    </>
  );
};

export default TemplateModal;
