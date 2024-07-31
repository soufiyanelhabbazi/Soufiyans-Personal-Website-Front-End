import {Project} from "./project.model";

export interface ProjectResponse {
  data: Project[];
  page: number;
  totalPages: number;
  totalItems: number;
}
