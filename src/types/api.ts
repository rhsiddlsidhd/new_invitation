export interface APISUCCESSRESPONSE<T = void> {
  success: true;
  data: {
    code: number;
    message: string;
    payload: T;
  };
}

export interface APIFAILRESPONSE {
  success: false;
  error: {
    code: number;
    message: string;
  };
}

export type APIRESPONSE<T = void> = APISUCCESSRESPONSE<T> | APIFAILRESPONSE;
