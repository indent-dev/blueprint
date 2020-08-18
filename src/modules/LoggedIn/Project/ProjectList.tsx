import React from "react";
import { Card, Row, Col } from "antd";
import { useProjectSync, Project } from "./useProjectSync";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ProjectList = (props: {
  onSelect: (project: Project) => void;
  onToggleModal: () => void;
}) => {

  const handleEditClick = React.useCallback(
    (project: Project) => {
      props.onSelect(project);
      props.onToggleModal();
    },
    [props]
  );

  const projectSync = useProjectSync();

  const confirm = React.useCallback(
    (id: string) => {
      projectSync.deleteProject(id);
    },
    [projectSync]
  );

  return (
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
        projectSync.projects.map((project: Project) => {
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
                  <EditOutlined
                    onClick={() => {
                      handleEditClick(project);
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
  );
};

export default ProjectList;
