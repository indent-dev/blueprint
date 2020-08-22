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
  loadMoreProject: () => void;
  hasNextPage: boolean;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (sortDirection: "asc" | "desc") => void;
};

export const useProjectSync = (): ProjectSyncValue => {
  const [sortBy, setSortBy] = React.useState<string>("createdAt");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc"
  );
  const [page, setPage] = React.useState<number>(1);
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(false);

  const {
    data,
    isValidating,
    errorValidate,
    mutate,
    isMutating,
    errorMutate,
    request,
  } = useRequest<Project[]>(
    `/project?page=1&itemPerPage=8&sortBy=${sortBy}&sortDirection=${sortDirection}`
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

  const loadMoreProject = React.useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        await mutate(async () => {
          const nextPageProjects = await request.get<Project[]>(
            `/project?page=${page}&itemPerPage=8&sortBy=${sortBy}&sortDirection=${sortDirection}`
          );
          return [...projects, ...nextPageProjects];
        });

        const nextTwoPageProjects = await request.get<Project[]>(
          `/project?page=${
            page + 1
          }&itemPerPage=8&sortBy=${sortBy}&sortDirection=${sortDirection}`
        );
        setHasNextPage(nextTwoPageProjects.length > 0);
      } catch (err) {
        notification.error({
          message: "Failed to load project",
          description: err.message,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    setPage(1);
  }, [sortBy, sortDirection]);

  return {
    projects,
    isValidating,
    errorValidate,
    isMutating,
    errorMutate,
    createProject,
    updateProject,
    deleteProject,
    loadMoreProject,
    hasNextPage,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
  };
};

const ProjectContext = React.createContext<ProjectSyncValue>({
  projects: [],
  isValidating: false,
  isMutating: false,
  createProject: () => new Promise(() => {}),
  updateProject: () => new Promise(() => {}),
  deleteProject: () => new Promise(() => {}),
  loadMoreProject: () => {},
  hasNextPage: false,
  sortBy: "",
  setSortBy: () => {},
  sortDirection: "asc",
  setSortDirection: () => {},
});

export const ProjectProvider = (props: { children: React.ReactNode }) => {
  const projectSync = useProjectSync();
  return (
    <ProjectContext.Provider value={projectSync}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export const useProjectSyncContext = () => React.useContext(ProjectContext);
