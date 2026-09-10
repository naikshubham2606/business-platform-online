import { useState, useEffect } from 'react';
import { publicProjectsService } from '@/services/api/publicProjectsService';
import type { ProjectListDto, ProjectDetailsDto } from '@/types/project';

// Simple module-level cache to prevent redundant fetches within the same session
let cachedProjectsList: ProjectListDto[] | null = null;
const detailsCache = new Map<string, ProjectDetailsDto>();

export function useProjectsList() {
  const [data, setData] = useState<ProjectListDto[] | null>(cachedProjectsList);
  const [loading, setLoading] = useState(!cachedProjectsList);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    const res = await publicProjectsService.getProjects();

    if (res.isSuccess && res.data) {
      cachedProjectsList = res.data;
      setData(res.data);
    } else {
      setError(res.message || 'Unable to load our projects.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!cachedProjectsList) {
      void fetchProjects();
    }
  }, []);

  return { data, loading, error, retry: fetchProjects };
}

export function useProjectDetails(id: string | null) {
  const [data, setData] = useState<ProjectDetailsDto | null>(() => (id ? detailsCache.get(id) || null : null));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    if (detailsCache.has(id)) {
      setData(detailsCache.get(id)!);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      
      const res = await publicProjectsService.getProjectById(id);
      
      if (res.isSuccess && res.data) {
        detailsCache.set(id, res.data);
        setData(res.data);
      } else {
        setError(res.message || 'Unable to load project details.');
      }
      setLoading(false);
    };

    void fetchDetails();
  }, [id]);

  return { data, loading, error, retry: () => id && detailsCache.delete(id) }; // We can clear cache on retry if needed
}
