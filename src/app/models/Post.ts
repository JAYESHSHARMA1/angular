export class Post {
  userId: string;
  description: string;
  postType: string;
  resourceUrls: Array<string>;
  hashTags: Array<string>;
  usersTags: []; //user array
  location: any;
  meta: {
    likes: number;
    comments: number;
  };
  control: {
    isBlocked: boolean;
    isSensitive: boolean;
    isCommentsEnabled: boolean;
  };
  constructor(post) {
    this.userId = post.userId;
    this.description = post.description;
    this.postType = post.postType;
    this.resourceUrls = post.resourceUrls;
    this.hashTags = post.hashTags;
    this.usersTags = post.usersTags; //[]; //user array
    this.location = post.location;
    this.meta = {
      likes: post.meta.likes,
      comments: post.meta.comments,
    };
    this.control = {
      isBlocked: post.control.isBlocked,
      isSensitive: post.control.isSensitive,
      isCommentsEnabled: post.control.isCommentsEnabled,
    };
  }
}
