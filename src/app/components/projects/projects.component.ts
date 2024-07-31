import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/project.model";
import {ProjectResponse} from "../../models/project-response.model";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  //projects !: Observable<Array<Project>>;
  projects: Project[] = [];

  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  pageSize: number = 2;
  constructor(private projectService:ProjectService){}

  /*ngOnInit() {
    //this.getProjects();
  }*/

  /*getProjects() {
    this.projects = this.projectService.getProjects();
  }*/

  ngOnInit() {
    this.loadProjects(this.currentPage);
  }

  loadProjects(page: number) {
    this.projectService.getProjects(page, this.pageSize).subscribe((response: ProjectResponse) => {
      this.projects = response.data;
      this.currentPage = response.page;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
    });
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.loadProjects(page);
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



  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

/*  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }*/
}
