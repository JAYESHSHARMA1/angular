export interface SignUpResponseData {
  success: boolean;
  error: boolean;
  isWarning: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
  };
}
