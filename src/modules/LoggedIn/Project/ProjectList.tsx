import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useProjectSyncContext, Project } from "./ProjectSyncContext";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ProjectList = (props: { onEditClick: (project: Project) => void }) => {
  const projectSyncContext = useProjectSyncContext();

  const handleDelete = React.useCallback(
    (id: string) => {
      projectSyncContext.deleteProject(id);
    },
    [projectSyncContext]
  );

  return (
    <>
      <Row style={{ marginTop: 16 }} gutter={[24, 16]}>
        {projectSyncContext.isValidating || projectSyncContext.isMutating ? (
          <>
            <Col span={6}>
              <Card loading></Card>
            </Col>
            <Col span={6}>
              <Card loading></Card>
            </Col>
            <Col span={6}>
              <Card loading></Card>
            </Col>
            <Col span={6}>
              <Card loading></Card>
            </Col>
          </>
        ) : (
          projectSyncContext.projects.map(project => {
            return (
              <Col span={6} key={project._id}>
                <Card
                  hoverable
                  actions={[
                    <Popconfirm
                      okButtonProps={{ loading: projectSyncContext.isMutating }}
                      title="Are you sure delete this project ?"
                      onConfirm={() => handleDelete(project._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{
                          fontSize: 20,
                        }}
                      />
                    </Popconfirm>,
                    <EditOutlined
                      onClick={() => {
                        props.onEditClick(project);
                      }}
                    />,
                  ]}
                >
                  <Card.Meta
                    title={project.name}
                    description={project.description}
                  />
                </Card>
              </Col>
            );
          })
        )}
      </Row>
      {!projectSyncContext.isMutating &&
        !projectSyncContext.isValidating &&
        projectSyncContext.hasNextPage && (
          <Row align="middle" justify="center">
            <Button onClick={projectSyncContext.loadMoreProject}>
              Show More Project
            </Button>
          </Row>
        )}
    </>
  );
};

export default ProjectList;
