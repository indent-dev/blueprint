import React from "react";
import { Layout, Typography, Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProjectForm from "./ProjectForm";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import { Project } from "./useProjectSync";

const ProjectPage = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [selectedProject, setSelectedProject] = React.useState<Project>();

  const handleToggleModal = React.useCallback(() => {
    if (visible) setSelectedProject(undefined);
    setVisible(prev => !prev);
  }, [visible]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header style={{ backgroundColor: "#fff" }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Typography.Title level={4}>Blueprint</Typography.Title>
          </Col>
          <Col>
            <Typography.Text>M. Nindra Zaka</Typography.Text>
            <UserOutlined style={{ marginLeft: 15 }} />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: 50 }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Typography.Title level={4}>Project Workspace</Typography.Title>
          </Col>
          <Col>
            <Row align="middle" justify="space-between" gutter={16}>
              <Col>
                <ProjectFilter />
              </Col>
              <Col>
                <Button type="primary" onClick={handleToggleModal}>
                  Create New Project
                </Button>
                <ProjectForm
                  visible={visible}
                  onToggleModal={handleToggleModal}
                  project={selectedProject}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <ProjectList
          onSelect={setSelectedProject}
          onToggleModal={handleToggleModal}
        />
      </Layout.Content>
    </Layout>
  );
};

export default ProjectPage;
