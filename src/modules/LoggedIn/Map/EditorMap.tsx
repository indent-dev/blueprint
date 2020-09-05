import React from "react";
import ProjectMap from "./ProjectMap";
import { Layout, Typography, Row, Col, Input } from "antd";
const EditorMap = () => {
  return (
    <>
      <ProjectMap />
      <Layout style={{ height: "90vh" }}>
        <Layout.Content>
          <Typography.Title style={{ textAlign: "center", marginTop: 15 }}>
            Ini Component Editor Map
          </Typography.Title>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default EditorMap;
