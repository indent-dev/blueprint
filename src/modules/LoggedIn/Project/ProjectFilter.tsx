import React from "react";
import { Row, Col, Input, Select, Form } from "antd";
const { Option } = Select;
const { Search } = Input;
const ProjectFilter = () => {
  return (
    <Form>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Sort By" name="sorting" style={{ margin: 0 }}>
            <Select id="sorting" defaultValue="newest" style={{ width: 120 }}>
              <Option value="newest">Newest</Option>
              <Option value="oldest">Oldest</Option>
              <Option value="name">Name</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Search
            placeholder="Search Project Name Card"
            style={{ width: 200 }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectFilter;
