import { appSelectors } from '../selectors';

// App selectors
export type AppStateType = ReturnType<typeof appSelectors.getAppState>;
