import React from "react";
import "./ShareModal.css";

interface IShareModal {
    closeModal: () => void;
}
const ShareModal: React.FC<IShareModal> = (props) => {
  console.log("ShareModal props", props);

  return (
    <>
      <div className="share-modal">ShareModal</div>
    </>
  );
};

export default ShareModal;
