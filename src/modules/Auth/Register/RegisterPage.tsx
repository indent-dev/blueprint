import React from "react";
import { Formik } from "formik";
import Modal from "antd/lib/modal/Modal";
import { Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { Form, TextField } from "../../../components/FormikWrapper";
import * as yup from "yup";

const RegisterPage = () => {
  const validationSchema = React.useMemo(() => {
    return yup.object({
      email: yup.string().required(),
      password: yup.string().required(),
      password_confirmation: yup.string().required(),
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
          title={<Typography.Title level={2}>Register</Typography.Title>}
          visible={true}
          // onCancel={props.onToggleModal}
          footer={
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                Already have account ? <Link to="/auth/login">login now</Link>
              </Typography>
              <Button
                type="primary"
                htmlType="submit"
                // loading={projectSync.isMutating}
              >
                Register
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
            <TextField
              name="password_confirmation"
              label="Password Confirmation"
              type="password"
              placeholder="*********"
            />
          </Form>
        </Modal>
      </Formik>
    </>
  );
};

export default RegisterPage;
