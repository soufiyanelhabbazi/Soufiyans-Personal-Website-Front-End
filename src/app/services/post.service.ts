import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {environment} from "../../environments/environment.prod";
import {PostResponse} from "../models/PostResponse";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {}

/*
 public getPosts():Observable<Array<Post>> {
    return this.http.get<Array<Post>>(environment.backend+"/articles");
  }
*/

 public getPosts(page: number, pageSize: number):Observable<PostResponse> {
   let params = new HttpParams()
     .set('page', page.toString())
     .set('limit', pageSize.toString());
    return this.http.get<PostResponse>(environment.backend+"/articles", { params });
  }


  public getPost(postID:string):Observable<Post> {
    return this.http.get<Post>(environment.backend+"/articles/"+postID);
  }
  public savePost(post: Post):Observable<Post> {
    return this.http.post<Post>(environment.backend+"/articles", post);
  }
  public updatePost(post: Post):Observable<Post> {
    return this.http.put<Post>(environment.backend+"/articles", post);
  }
  public deletePost(postID:string) {
    return this.http.delete<Post>(environment.backend+"/articles/"+postID);
  }
}
