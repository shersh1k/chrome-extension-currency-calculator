export interface IFetchJsonRequest {
  type: 'FETCH_JSON';
  url: string;
}

export interface IFetchJsonResponse<T = unknown> {
  ok: boolean;
  status: number;
  data: T | null;
}

export type FetchJsonMessageResponse<T = unknown> = IFetchJsonResponse<T> | { error: string };
