// refactor to functional component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { submit, SubmissionError } from 'redux-form';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';

export default class ProjectTaskForm extends Component {
  // constructor() {
  //   super() 
  // }
  
  render() {
    const {
      children,
      handleSubmit,
      handleCancel,
      label
     } = this.props;
     
    return (
      <div>
        {label && <label>{label}</label>}  
        {children}        
        <AddTasksFormContainer
          shouldRenderSubmitButton={false}
          // showTasksForSelectedProject={false || showTasksForSelectedProject}
        />  
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }
}
  
ProjectTaskForm.propTypes = {
  children: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}
