import React from "react";
import { Layout, Typography, Row, Col, Select, Form } from "antd";
import {
  UserOutlined,
  ShareAltOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { Option } = Select;
const ProjectMap = () => {
  const [editableStr, setEditableStr] = React.useState("Jawa Timur Park");
  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: "#fff" }}>
        <Row align="middle" justify="space-between">
          <Row gutter={26} align="middle" justify="space-between">
            <Col>
              <Form.Item name="dropdown" style={{ margin: 0 }}>
                <Select
                  defaultValue="Blueprint"
                  value="blueprint"
                  bordered={false}
                  style={{ width: 120, fontWeight: "bold" }}
                >
                  <Option value="Blueprint">Blueprint</Option>
                  <Option value="Blueprint2">Blueprint 2</Option>
                  <Option value="Blueprint3">Blueprint 3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Typography.Text
                style={{ fontSize: 16 }}
                editable={{ onChange: setEditableStr }}
              >
                {editableStr}
              </Typography.Text>
            </Col>
          </Row>
          <Row gutter={16} align="middle" justify="space-between">
            <Col>
              <ClusterOutlined style={{ marginRight: 10 }} />
              <NavLink
                to="/map/editor"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: "rgba(0, 0, 0, 0.65)" }}
              >
                Editor
              </NavLink>
            </Col>
            <Col>
              <ShareAltOutlined style={{ marginRight: 10 }} />
              <NavLink
                to="/map/publish"
                activeStyle={{ fontWeight: "bold" }}
                style={{ color: "rgba(0, 0, 0, 0.65)" }}
              >
                Publishing
              </NavLink>
            </Col>
            <Col>
              <Typography.Text>M. Nindra Zaka</Typography.Text>
              <UserOutlined style={{ marginLeft: 15 }} />
            </Col>
          </Row>
        </Row>
      </Layout.Header>
    </Layout>
  );
};

export default ProjectMap;
