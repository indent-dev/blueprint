import React from "react";
import { Row, Col, Input, Select, Form } from "antd";
import { useProjectSyncContext } from "./ProjectSyncContext";
const { Option } = Select;
const { Search } = Input;

type ProjectSortOption = {
  name: string;
  label: string;
  sortBy: string;
  sortDirection: "asc" | "desc";
};

const projectSortOptions: ProjectSortOption[] = [
  {
    name: "newest",
    label: "Newest",
    sortBy: "createdAt",
    sortDirection: "desc",
  },
  {
    name: "oldest",
    label: "Oldest",
    sortBy: "createdAt",
    sortDirection: "asc",
  },
  {
    name: "name",
    label: "Name",
    sortBy: "name",
    sortDirection: "asc",
  },
];

const ProjectFilter = () => {
  const projectSyncContext = useProjectSyncContext();

  const handleSortChange = React.useCallback(
    (sortName: string) => {
      const selectedProjectSortOption = projectSortOptions.find(
        option => option.name === sortName
      );

      projectSyncContext.setSortBy(selectedProjectSortOption?.sortBy || "");
      projectSyncContext.setSortDirection(
        selectedProjectSortOption?.sortDirection || "desc"
      );
    },
    [projectSyncContext]
  );

  const sortValue = React.useMemo(() => {
    return projectSortOptions.find(
      option =>
        option.sortBy === projectSyncContext.sortBy &&
        option.sortDirection === projectSyncContext.sortDirection
    )?.name;
  }, [projectSyncContext.sortBy, projectSyncContext.sortDirection]);

  const handleQueryChange = React.useCallback(
    item => {
      projectSyncContext.setsearchQuery(item.target.value);
    },
    [projectSyncContext]
  );

  return (
    <Form>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Sort By" name="sorting" style={{ margin: 0 }}>
            <Select
              defaultValue={sortValue}
              value={sortValue}
              onChange={handleSortChange}
              style={{ width: 120 }}
            >
              {projectSortOptions.map(option => (
                <Option value={option.name}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Search
            placeholder="Search Project Name Card"
            onChange={handleQueryChange}
            style={{ width: 200 }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default React.memo(ProjectFilter);
