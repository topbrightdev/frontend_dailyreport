import type { RootState } from "../../store";

// Other code such as selectors can use the imported `RootState` type
export const signinAuth = (state: RootState) => state.auth.user;
