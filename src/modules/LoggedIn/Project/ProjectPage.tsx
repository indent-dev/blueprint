import React from "react";
import { Layout, Typography, Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

const ProjectPage = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const toggleModal = React.useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

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
          <Typography.Title level={4}>Project Workspace</Typography.Title>
          {/* <ProjectForm /> */}
          <Button type="primary" onClick={toggleModal}>
            Create New Project
          </Button>
          <ProjectForm visible={visible} toggleModal={toggleModal} />
        </Row>
        <ProjectList />
      </Layout.Content>
    </Layout>
  );
};

export default ProjectPage;
