import React from "react";
import { notification } from "antd";
import useRequest from "../../../utils/useRequest";

export type Project = {
  _id: string;
  name: string;
  description: string;
};

export type ProjectRequest = Omit<Project, "_id">;

type ProjectSyncValue = {
  projects: Project[];
  isValidating: boolean;
  errorValidate?: string;
  isMutating: boolean;
  errorMutate?: string;
  createProject: (projectRequest: ProjectRequest) => Promise<void>;
  updateProject: (projectRequest: ProjectRequest, id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
};

export const useProjectSync = (): ProjectSyncValue => {
  const {
    data,
    isValidating,
    errorValidate,
    mutate,
    isMutating,
    errorMutate,
    request
  } = useRequest<Project[]>(
    "/project/?page=1&itemPerPage=10&sortBy=name&sortDirection=asc"
  );

  const projects = React.useMemo(() => {
    return data || [];
  }, [data]);

  const createProject = React.useCallback(
    async (projectRequest: ProjectRequest) => {
      try {
        await mutate(async () => {
          const createdProject = await request.post<Project>(
            "/project",
            projectRequest
          );
          return [...projects, createdProject];
        });
        notification.success({
          message: "Project creation success",
          description: "Your project is successfully created",
        });
      } catch (err) {
        notification.error({
          message: "Project creation failed",
          description: err.message,
        });
      }
    },
    [mutate, projects, request]
  );

  const updateProject = React.useCallback(
    async (projectRequest: ProjectRequest, id: string) => {
      try {
        await mutate(async () => {
          const updatedProject = await request.put<Project>(
            `/project/${id}`,
            projectRequest
          );
          return projects.map(project =>
            project._id === updatedProject._id ? updatedProject : project
          );
        });
        notification.success({
          message: "Project edit success",
          description: "Your project is successfully edited",
        });
      } catch (err) {
        notification.error({
          message: "Project edit failed",
          description: err.message,
        });
      }
    },
    [mutate, projects, request]
  );

  const deleteProject = React.useCallback(
    async (id: string) => {
      try {
        await mutate(async () => {
          await request.delete<Project>(`/project/${id}`);
          return projects.filter(project => project._id !== id);
        });
        notification.success({
          message: "Project delete success",
          description: "Your project is successfully deleted",
        });
      } catch (err) {
        notification.error({
          message: "Project delete failed",
          description: err.message,
        });
      }
    },
    [mutate, projects, request]
  );

  return {
    projects,
    isValidating,
    errorValidate,
    isMutating,
    errorMutate,
    createProject,
    updateProject,
    deleteProject,
  };
};
