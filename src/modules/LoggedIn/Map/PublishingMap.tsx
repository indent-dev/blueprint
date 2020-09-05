import React from "react";
import { Layout, Typography, Row, Col, Input } from "antd";
import ProjectMap from "./ProjectMap";

const PublishingMap = () => {
  return (
    <>
      <ProjectMap />
      <Layout style={{ height: "90vh" }}>
        <Layout.Content
          style={{
            padding: 50,
          }}
        >
          <Row align="middle" justify="center">
            <Col
              style={{
                textAlign: "center",
                padding: 60,
                boxShadow:
                  "4px 4px 10px rgba(0, 0, 0, 0.1), -4px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography.Title>Share Your Map</Typography.Title>
              <Typography.Text>Here is your map link</Typography.Text>
              <Input
                addonBefore="http://blueprint-indent.netlify.app/map/"
                defaultValue="v2yKM59pQtB"
                style={{ marginTop: 25 }}
              />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default PublishingMap;
