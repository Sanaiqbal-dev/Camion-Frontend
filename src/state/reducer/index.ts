import { combineReducers } from 'redux';
import sessionReducer from '../slice/sessionSlice';
import selectedObjReducer from '../slice/selectedObjSlice';
import childObjReducer from '../slice/childObjSlice';
import tableConfigurationReducer from '../slice/tableConfigurationSlice';
import { baseApi } from '@/services/baseApi';

const reducers = combineReducers({
  session: sessionReducer,
  selectedObj: selectedObjReducer,
  childObj: childObjReducer,
  tableConfiguration: tableConfigurationReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
