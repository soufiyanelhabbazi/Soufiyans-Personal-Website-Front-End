import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project.model";
import {environment} from "../../environments/environment.prod";
import {ProjectResponse} from "../models/project-response.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) {}

 public getProjects(page: number, pageSize: number):Observable<ProjectResponse> {
   let params = new HttpParams()
     .set('page', page.toString())
     .set('limit', pageSize.toString());

   return this.http.get<ProjectResponse>(environment.backend + "/projects",{params});
 }

  /*getProjects(page: number, pageSize: number): Observable<Project> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }*/
  public getProject(projectID:string):Observable<Project> {
    return this.http.get<Project>(environment.backend+"/projects/"+projectID);
  }
  public saveProject(project: Project):Observable<Project> {
    return this.http.post<Project>(environment.backend+"/projects", project);
  }
  public updateProject(project: Project):Observable<Project> {
    return this.http.put<Project>(environment.backend+"/projects", project);
  }
  public deleteProject(projectID:string) {
    return this.http.delete<Project>(environment.backend+"/projects/"+projectID);
  }
}
