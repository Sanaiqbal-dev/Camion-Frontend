import { Middleware } from '@reduxjs/toolkit';
import { setLogout } from '@/state/slice/sessionSlice';
import { isRejectedWithValue } from '@reduxjs/toolkit';

interface RejectedActionPayload {
  statusCode: number;
}

// Type guard to check if the action is a rejected action with a status payload
const isRejectedWithStatus = (action: any): action is { payload: RejectedActionPayload } => {
  return isRejectedWithValue(action) && action.payload?.statusCode !== undefined;
};

const authMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (isRejectedWithStatus(action) && action.payload.statusCode === 401) {
    storeAPI.dispatch(setLogout());
  }
  return next(action);
};

export default authMiddleware;
