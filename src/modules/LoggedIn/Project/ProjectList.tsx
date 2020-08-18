import React from "react";
import { Card, Row, Col, Button, Layout } from "antd";
import { useProjectSync } from "./useProjectSync";
import { Popconfirm } from "antd";
import { DeleteOutlined, AlignCenterOutlined } from "@ant-design/icons";

const ProjectList = () => {
  const projectSync = useProjectSync();

  const confirm = React.useCallback(
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
                      onConfirm={() => confirm(project._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{
                          fontSize: 20,
                        }}
                      />
                    </Popconfirm>,
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
        <Button>Show More Project</Button>
      </Row>
    </>
  );
};

export default ProjectList;
