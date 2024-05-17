import { ChildObj, CommonSelect, RelationshipType } from '@/interface/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultObj: ChildObj = {
  objName: undefined,
  openDrawer: false,
  hasSelected: false,
  filterKeys: {},
  label: '',
  type: undefined,
  m2MSelectedValue: undefined,
};
const initialState: Record<string, ChildObj> = {};

const childObjSlice = createSlice({
  name: 'childObj',
  initialState,
  reducers: {
    openChildDrawer(
      state: any,
      action: PayloadAction<{ objKey: string; filterKeys: Record<string, any>; label: string; objName: string; type: RelationshipType; m2MSelectedValue?: CommonSelect }>,
    ) {
      const childObj: ChildObj = {
        openDrawer: true,
        hasSelected: true,
        filterKeys: action.payload.filterKeys,
        label: action.payload.label,
        objName: action.payload.objName,
        type: action.payload.type,
        m2MSelectedValue: action.payload.m2MSelectedValue,
      };

      state[action.payload.objKey] = childObj;
    },
    resetChildObj(state: any, action: PayloadAction<string>) {
      state[action.payload] = defaultObj;
    },
  },
});

export const { resetChildObj, openChildDrawer } = childObjSlice.actions;

export default childObjSlice.reducer;
