import React from "react";
import { Formik } from "formik";
import Modal from "antd/lib/modal/Modal";
import { Form, TextField } from "../../../components/FormikWrapper";
import { Space, Button, Typography } from "antd";
import * as yup from "yup";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const validationSchema = React.useMemo(() => {
    return yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
    });
  }, []);

  const handleSubmit = React.useCallback(() => {}, []);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Modal
          closable={false}
          title={<Typography.Title level={2}>Login</Typography.Title>}
          visible={true}
          // onCancel={props.onToggleModal}
          footer={
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                Dont have account ?{" "}
                <Link to="/auth/register">register now</Link>{" "}
              </Typography>
              <Button
                type="primary"
                htmlType="submit"
                // loading={projectSync.isMutating}
              >
                Login
              </Button>
            </Space>
          }
        >
          <Form>
            <TextField
              name="email"
              label="Email"
              placeholder="example@mail.com"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              placeholder="*********"
            />
          </Form>
        </Modal>
      </Formik>
    </>
  );
};

export default LoginPage;
