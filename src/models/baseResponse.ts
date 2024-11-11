export interface baseResp {
  data: any;
  message: string;
  success: boolean;
}

export interface baseRespLogin extends baseResp{
    bearerToken: string;
}