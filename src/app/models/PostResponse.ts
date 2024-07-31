import {Post} from "./post.model";

export interface PostResponse {
  data: Post[];
  page: number;
  totalPages: number;
  totalItems: number;
}
