import { SelectedObj } from "@/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import produce, { Draft } from 'immer';

const initialState: SelectedObj = {
  objName: undefined,
  openDrawer: false,
  openModal: false,
  showDelete: false,
  hasSelected: false,
  primaryKeys: {},
  label: "",
};

const selectedObjSlice = createSlice({
  name: "selectedObj",
  initialState,
  reducers: {
    setSelectedObj(state: SelectedObj, action: PayloadAction<SelectedObj>) {
      console.log(state);
      return action.payload;
    },
    setInfoForDetail(
      state: SelectedObj,
      action: PayloadAction<{
        primaryKeys: Record<string, any>;
        label: string;
        objName: string;
      }>
    ) {
      console.log(state);
      return {
        ...initialState,
        openModal: true,
        hasSelected: true,
        primaryKeys: action.payload.primaryKeys,
        label: action.payload.label,
        objName: action.payload.objName,
      };
    },
    setInfoForEdit(
      state: SelectedObj,
      action: PayloadAction<{
        primaryKeys: Record<string, any>;
        label: string;
        objName: string;
      }>
    ) {
      console.log(state);
      return {
        ...initialState,
        openDrawer: true,
        hasSelected: true,
        primaryKeys: action.payload.primaryKeys,
        label: action.payload.label,
        objName: action.payload.objName,
      };
    },
    setInfoForDelete(
      state: SelectedObj,
      action: PayloadAction<{
        primaryKeys: Record<string, any>;
        label: string;
        objName: string;
      }>
    ) {
      console.log(state);
      return {
        ...initialState,
        showDelete: true,
        hasSelected: true,
        primaryKeys: action.payload.primaryKeys,
        label: action.payload.label,
        objName: action.payload.objName,
      };
    },
    openDrawer(state: SelectedObj, action: PayloadAction<{ objName: string }>) {
      console.log(state);
      return {
        ...initialState,
        openDrawer: true,
        hasSelected: false,
        objName: action.payload.objName,
      };
    },
    resetSelectedObj() {
      return initialState;
    },
  },
});

export const {
  setSelectedObj,
  resetSelectedObj,
  setInfoForDetail,
  setInfoForEdit,
  setInfoForDelete,
  openDrawer,
} = selectedObjSlice.actions;

export default selectedObjSlice.reducer;
