export class User {
  public profile: {
    address: any;
    profileImageUrl: string;
    bio: string;
    website: string;
    fullName: string;
  };
  public loginStatus: {
    isOnline: boolean;
    lastLogin: Array<string>;
  };
  public verification: {
    emailVerified: boolean;
    phoneVerified: boolean;
  };
  public privacySettings: {
    isPrivate: boolean;
  };
  public notificationSettings: {
    isEnabled: boolean;
    isFollowNotificationEnabled: boolean;
  };
  private control: {
    isBlocked: boolean;
  };
  public posts: Array<string>;
  public _id: string;
  public email: string;
  public userName: string;
  public socialAccounts: Array<any>;
  public createdAt: string;
  public updatedAt: string;
  private _token: string;
  private _tokenExpDate: Date;

  constructor(user) {
    this.profile = user.profile;
    this.loginStatus = user.loginStatus;
    this.verification = user.verification;
    this.privacySettings = user.privacySettings;
    this.notificationSettings = user.notificationSettings;
    this.control = user.control;
    this.posts = user.posts;
    this._id = user._id;
    this.email = user.email;
    this.userName = user.userName;
    this.socialAccounts = user.socialAccounts;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this._token = user.token;
    this._tokenExpDate = user.token;
  }

  get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) return null;
    return this._token;
  }
}
