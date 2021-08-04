import { StateType } from 'typesafe-actions';

import { rootReducer } from '../rootReducer';

export type IState = StateType<typeof rootReducer>;
