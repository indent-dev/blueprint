import React, { ChangeEvent } from "react";
import { Button, Modal } from "antd";
import { useProjectSync, ProjectRequest, Project } from "./useProjectSync";

type FormProps = {
  visible: boolean;
  toggleModal: () => void;
  project?: Project;
};

const ProjectForm = (props: FormProps) => {
  const projectSync = useProjectSync();
  const [newData, setNewData] = React.useState<ProjectRequest>({
    name: "",
    description: "",
  });

  React.useEffect(() => {
    setNewData({
      name: props.project ? props.project.name : "",
      description: props.project ? props.project.description : "",
    });
  }, [props.project]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewData({ ...newData, [event.target.name]: event.target.value });
    },
    [newData]
  );

  const handleSubmit = React.useCallback(async () => {
    if (props.project)
      await projectSync.updateProject(newData, props.project._id);
    else await projectSync.createProject(newData);
    props.toggleModal();
  }, [projectSync, props, newData]);

  return (
    <>
      <Modal
        title={props.project ? "Update Project" : "Create Project"}
        visible={props.visible}
        onCancel={props.toggleModal}
        footer={[
          <Button key="back" onClick={props.toggleModal}>
            Cancel
          </Button>,
          <Button
            key="Create Project"
            type="primary"
            onClick={handleSubmit}
            loading={projectSync.isMutating}
          >
            {props.project ? "Update Project" : "Create Project"}
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: 14 }}>
            Project Name
          </p>
          <input
            type="text"
            placeholder="Jawa Timur Park"
            name="name"
            value={props.project ? props.project.name : ""}
            onChange={handleChange}
            style={{
              border: "1px solid #D9D9D9",
              outline: "none",
              borderRadius: 4,
              fontSize: 14,
              minWidth: "100%",
              padding: "5px 12px",
            }}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            placeholder="Interactive jawa timur park map for visitor"
            name="description"
            value={newData.description}
            onChange={handleChange}
            style={{
              border: "1px solid #D9D9D9",
              outline: "none",
              borderRadius: 4,
              fontSize: 14,
              minWidth: "100%",
              padding: "5px 12px",
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProjectForm;
