import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  feedPosts: Array<Post> = [
    new Post({
      userId: '1',
      description:
        'All our dreams can come true, if we have the courage to pursue them.',
      postType: 'image',
      resourceUrls: [
        'https://images.pexels.com/photos/217250/pexels-photo-217250.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      ],
      hashTags: ['#string'],
      usersTags: [], //user array
      location: {},
      meta: {
        likes: 120,
        comments: 18,
      },
      control: {
        isBlocked: false,
        isSensitive: false,
        isCommentsEnabled: true,
      },
    }),
    new Post({
      userId: '1',
      description:
        'All our dreams can come true, if we have the courage to pursue them.',
      postType: 'image',
      resourceUrls: [
        'https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ],
      hashTags: ['#string'],
      usersTags: [], //user array
      location: {},
      meta: {
        likes: 120,
        comments: 18,
      },
      control: {
        isBlocked: false,
        isSensitive: false,
        isCommentsEnabled: false,
      },
    }),
    new Post({
      userId: '1',
      description:
        'All our dreams can come true, if we have the courage to pursue them.',
      postType: 'image',
      resourceUrls: [
        'https://images.pexels.com/photos/7932264/pexels-photo-7932264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      ],
      hashTags: ['#string'],
      usersTags: [], //user array
      location: {},
      meta: {
        likes: 120,
        comments: 18,
      },
      control: {
        isBlocked: false,
        isSensitive: false,
        isCommentsEnabled: true,
      },
    }),
  ];
  constructor() {}

  getPosts() {
    return this.feedPosts;
  }
}
