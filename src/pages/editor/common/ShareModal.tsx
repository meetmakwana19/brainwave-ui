import React, { useState } from "react";
import "./ShareModal.css";
import { Icon, Pills, Truncate } from "@contentstack/venus-components";

interface IShareModal {
  closeModal: () => void;
  documentName: string;
}

interface InviteCollaboratorEmail {
    id: number | string;
    text: string;
  }

const ShareModal: React.FC<IShareModal> = (props) => {
  const [collaboratorEmails, setCollaboratorEmails] = useState<
    InviteCollaboratorEmail[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  console.log("error in share modal", error);
  

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailsChange = (emails: InviteCollaboratorEmail[]) => {

    console.log("Sharing document with emails:", collaboratorEmails);
    
    // Update the items first to allow input changes
    setCollaboratorEmails(emails);
  
    // Reset previous error
    setError(null);
  
    // Perform validation
    const duplicateEmail = emails.find(
      (email, index, self) =>
        self.findIndex((e) => e.text === email.text) !== index
    );
  
    if (duplicateEmail) {
      setError("Duplicate email addresses are not allowed.");
      return;
    }
  
    const invalidEmail = emails.find((email) => !validateEmail(email.text));
    if (invalidEmail) {
      setError("One or more email addresses are invalid.");
    }
  };
  

  const handleSubmit = () => {
    if (collaboratorEmails.length === 0) {
      setError("Please add at least one email.");
      return;
    }

    // Perform API call or further actions
    console.log("Sharing document with emails:", collaboratorEmails);
    props.closeModal();
  };

  return (
    <div className="share-modal" onClick={(e) => e.stopPropagation()}>
      <div className="share-modal-header">
        <div className="share-modal-title">Share</div>
        <div className="share-separator"></div>
        <div className="share-doc-title">
          <Icon icon="ApiDocs" version="v2" size="small" />
          <Truncate>{props.documentName}</Truncate>
        </div>
      </div>
      <div className="share-modal-body">
        <Pills
          id="collaborator-email"
          isEditable={true}
          variant="chip"
          placeholder="Enter Collaborator Email"
          items={collaboratorEmails}
        //   isError={!!error}
          onChange={handleEmailsChange}
        />
        {/* {error && (
          <ValidationMessage testId="collaborator-email-error" version="v2">
            {error}
          </ValidationMessage>
        )} */}
      </div>
      <div className="share-modal-footer">
        <button className="share-button-modal" onClick={handleSubmit}>
            Share
            {/* <Icon icon="Send" version="v2" size="small"/> */}
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
