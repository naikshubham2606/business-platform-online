import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/api';
import type { ProjectListDto, ProjectDetailsDto } from '@/types/project';
import { publicFetch } from './publicBusinessService';

export const publicProjectsService = {
  /**
   * GET /api/public/projects
   * Returns a list of all active projects.
   */
  getProjects(): Promise<ApiResponse<ProjectListDto[]>> {
    return publicFetch<ProjectListDto[]>(API_ENDPOINTS.PUBLIC.PROJECTS);
  },

  /**
   * GET /api/public/projects/{id}
   * Returns complete details for a specific project.
   */
  getProjectById(id: string): Promise<ApiResponse<ProjectDetailsDto>> {
    return publicFetch<ProjectDetailsDto>(API_ENDPOINTS.PUBLIC.PROJECT_DETAILS(id));
  },
};
