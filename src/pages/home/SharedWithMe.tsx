import React from "react";
import { IMicroAppsObj } from "../../types/microAppObj";

interface ISharedWithMe {
  microAppsObj: IMicroAppsObj;
}
const SharedWithMe: React.FC<ISharedWithMe> = () => {
  return (
    <>
      <div>SharedWithMe</div>
    </>
  );
};

export default SharedWithMe;
