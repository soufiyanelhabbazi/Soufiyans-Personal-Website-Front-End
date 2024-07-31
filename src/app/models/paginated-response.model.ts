import { Project } from './project.model';

export interface PaginatedResponse {
  data: Project[];
  page: number;
  totalPages: number;
  totalItems: number;
}
