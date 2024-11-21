export interface baseResp {
  status: boolean;
  data: any;
  message: string;
  error: string;
}

export interface baseResponse<T> {
  status: boolean;
  data: T[];
  message: string;
  error: string;
}

export interface baseRespLogin extends baseResp{
    bearerToken: string;
}