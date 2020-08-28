import React from "react";
import { Button, Modal, Divider, Space } from "antd";
import { useProjectSync, ProjectRequest, Project } from "./ProjectSyncContext";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, TextField } from "../../../components/FormikWrapper";

type FormProps = {
  visible: boolean;
  onToggleModal: () => void;
  project?: Project;
};

const ProjectForm = (props: FormProps) => {
  const projectSync = useProjectSync();

  const validationSchema = React.useMemo(() => {
    return yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
    });
  }, []);

  const handleSubmit = React.useCallback(
    async (projectRequest: ProjectRequest) => {
      if (props.project)
        await projectSync.updateProject(projectRequest, props.project._id);
      else await projectSync.createProject(projectRequest);
      props.onToggleModal();
    },
    [projectSync, props]
  );

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: props.project?.name || "",
          description: props.project?.description || "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Modal
          title={props.project ? "Update Project" : "Create Project"}
          visible={props.visible}
          onCancel={props.onToggleModal}
          footer={null}
        >
          <Form>
            <TextField name="name" label="Name" placeholder="Jawa Timur Park" />
            <TextField
              name="description"
              label="Description"
              placeholder="Interactive jawa timur park map for visitor"
            />
            <Divider />
            <Space>
              <Button onClick={props.onToggleModal}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={projectSync.isMutating}
              >
                {props.project ? "Update Project" : "Create Project"}
              </Button>
            </Space>
          </Form>
        </Modal>
      </Formik>
    </>
  );
};

export default ProjectForm;
