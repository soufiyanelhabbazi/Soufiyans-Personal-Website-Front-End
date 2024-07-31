import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import { Observable, map } from 'rxjs';
import {PostResponse} from "../../models/PostResponse";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  //posts$ !: Observable<Array<Post>>;

  posts: Post[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  pageSize: number = 3;
  constructor(private postService:PostService){}

  /*ngOnInit() {
    this.loadPosts();
    this.posts$ = this.posts$.pipe(
      map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    );
  }*/
  ngOnInit() {
    this.loadPosts(this.currentPage);
  }

 /* loadPosts() {
    this.posts$ = this.postService.getPosts();
  }*/

  loadPosts(page: number) {
    this.postService.getPosts(page, this.pageSize).subscribe((response: PostResponse) => {
      this.posts = response.data;
      this.currentPage = response.page;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
    });
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.loadPosts(page);
    }
  }

  get pages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const leftEllipsisStart = Math.max(2, this.currentPage - 1);
      const rightEllipsisEnd = Math.min(this.totalPages - 1, this.currentPage + 1);

      if (leftEllipsisStart > 2) {
        pages.push(-1); // -1 will represent the ellipsis in the template
      }

      for (let i = leftEllipsisStart; i <= rightEllipsisEnd; i++) {
        pages.push(i);
      }

      if (rightEllipsisEnd < this.totalPages - 1) {
        pages.push(-1); // -1 will represent the ellipsis in the template
      }

      pages.push(this.totalPages);
    }
    return pages;
  }


}
