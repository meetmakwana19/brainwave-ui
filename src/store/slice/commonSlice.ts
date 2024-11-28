import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMicroAppsObj } from "../../types/microAppObj";

interface IAppState {
  microAppsObj: IMicroAppsObj;
  tempDocUID: string;
}

const initialState: IAppState = {
  microAppsObj: {
    relativeUrl: "",
    leftsidebarContainerDom: "",
    org_uid: null,
    token: null,
    project_id: "",
    currentUser: undefined,
  },
  tempDocUID: "",
};

const commonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    updateMicroAppObj: (state, action: PayloadAction<IMicroAppsObj>) => {
      state.microAppsObj = action.payload; // Update the microAppsObj in the state
    },
    updateTempDocUID: (state, action: PayloadAction<string>) => {
      state.tempDocUID = action.payload; // Update the tempDocUID in the state
    },
  },
});

export const { updateMicroAppObj, updateTempDocUID } = commonSlice.actions;

export default commonSlice.reducer;
