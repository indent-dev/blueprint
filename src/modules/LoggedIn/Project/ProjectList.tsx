import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useProjectSync, Project } from "./useProjectSync";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ProjectList = (props: { onEditClick: (project: Project) => void }) => {
  const projectSync = useProjectSync();

  const handleDelete = React.useCallback(
    (id: string) => {
      projectSync.deleteProject(id);
    },
    [projectSync]
  );

  return (
    <>
      <Row style={{ marginTop: 16 }} gutter={[24, 16]}>
        {projectSync.isValidating ? (
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
          projectSync.projects.map(project => {
            return (
              <Col span={6} key={project._id}>
                <Card
                  hoverable
                  actions={[
                    <Popconfirm
                      okButtonProps={{ loading: projectSync.isMutating }}
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
      <Row style={{ padding: 50 }} align="middle" justify="center">
        <Button> Show More Project</Button>
      </Row>
    </>
  );
};

export default ProjectList;
