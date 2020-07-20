import React from "react";
import { Card, Row, Col, message } from "antd";
import { useProjectSync, Project } from "./useProjectSync";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProjectForm from "./ProjectForm";

const ProjectList = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [projectProps, setProjectProps] = React.useState<Project>();

  const toggleModal = React.useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const confirm = React.useCallback(() => {
    message.success("Task Deleted");
  }, []);

  const cancel = React.useCallback(() => {
    message.error("Canceled");
  }, []);

  const projectSync = useProjectSync();
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
                    title="Are you sure delete this project ?"
                    onConfirm={confirm}
                    onCancel={cancel}
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
                      setProjectProps(project);
                      toggleModal();
                    }}
                  />,
                ]}
              >
                <Card.Meta
                  title={project.name}
                  description={project.description}
                />
                <ProjectForm
                  visible={visible}
                  toggleModal={toggleModal}
                  project={projectProps}
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
