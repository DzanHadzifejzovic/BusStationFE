import React, { useState } from "react";
import { Container,ModalWindow,FormGroup } from "./Modal.styles";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      page: "",
      description: "",
      status: "live",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.page && formState.description && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <Container
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <ModalWindow>
        <form>

          <FormGroup>
            <label htmlFor="page">Page</label>
            <input name="page" onChange={handleChange} value={formState.page} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </FormGroup>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit"  onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </ModalWindow>
    </Container>
  );
};