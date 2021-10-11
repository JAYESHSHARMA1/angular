export interface SignInResponseData {
  success: boolean;
  error: boolean;
  isWarning: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      address: any;
      profileImageUrl: string;
      bio: string;
      website: string;
      fullName: string;
    };
    loginStatus: {
      isOnline: boolean;
      lastLogin: Array<string>;
    };
    verification: {
      emailVerified: boolean;
      phoneVerified: boolean;
    };
    privacySettings: {
      isPrivate: boolean;
    };
    notificationSettings: {
      isEnabled: boolean;
      isFollowNotificationEnabled: boolean;
    };
    control: {
      isBlocked: boolean;
    };
    posts: Array<string>;
    activeAccountRequests: Array<any>;
    _id: string;
    email: string;
    userName: string;
    devices: Array<string>;
    socialAccounts: Array<any>;
    createdAt: string;
    updatedAt: string;
    token: string;
    expiresIn?: string;
  };
}
