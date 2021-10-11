import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post;
  isLiked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleLikeClick(): boolean {
    this.isLiked = !this.isLiked;
    if (this.isLiked) this.post.meta.likes++;
    else this.post.meta.likes--;
    return this.isLiked;
  }
}
