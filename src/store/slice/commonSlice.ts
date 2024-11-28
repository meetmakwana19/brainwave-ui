import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMicroAppsObj } from '../../types/microAppObj';

interface IAppState {
    microAppsObj: IMicroAppsObj;
}

const initialState: IAppState = {
    microAppsObj: {
        relativeUrl: '',
        leftsidebarContainerDom: '',
        org_uid: null,
        token: null,
        project_id: '',
        currentUser: undefined
    },
};

const commonSlice = createSlice({
    name: 'Common',
    initialState,
    reducers: {
        updateMicroAppObj: (state, action: PayloadAction<IMicroAppsObj>) => {
            state.microAppsObj = action.payload; // Update the microAppsObj in the state
        },
    },
});

export const { updateMicroAppObj } = commonSlice.actions;

export default commonSlice.reducer;
