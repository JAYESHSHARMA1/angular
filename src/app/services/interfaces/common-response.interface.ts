export interface CommonResponse {
  success: boolean;
  error: boolean;
  isWarning: boolean;
  statusCode: number;
  message: string;
  data: any;
}
