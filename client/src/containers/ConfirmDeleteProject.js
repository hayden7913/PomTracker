import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal, deleteProject, toggleModal } from '../actions/indexActions'; 
import Confirm from '../components/Confirm';

const deleteProjectAndCloseModal = (deleteProjectParams, deleteProject, closeModal) => () => {
  console.log('fdsafd')
  deleteProject(deleteProjectParams);
  closeModal();
}

const getDangerText = (projectName) => {
  return (
    <span>Are you sure you want to delete project <span className="grey-title-text">{projectName}</span> ? </span>
  );
}

function ConfirmDeleteProject (props) {
  const { closeModal, deleteProject, payload } = props;
  const { projectName } = payload;
  
  return(
    <Confirm 
      onDangerClick={deleteProjectAndCloseModal(payload, deleteProject, closeModal)}
      onDangerText={getDangerText(projectName)}
      onCancel={toggleModal}
      title={<h2>Confirm Delete</h2>}
    />
  );
}

export default connect(null, { closeModal, deleteProject, toggleModal })(ConfirmDeleteProject);

ConfirmDeleteProject.propTypes = {
  
}