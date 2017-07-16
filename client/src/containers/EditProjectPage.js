import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { addTask, deleteTask, setSelectedProject, remoteSubmit, updateProject, updateTasks } from '../actions/indexActions';

import { hasAnyValue } from '../helpers/validate';
import { routeToProjects } from '../helpers/route'

import SingleInputForm from '../components/SingleInputForm';
import ProjectTaskForm from './ProjectTaskForm';
import RemoteSubmitForm from './RemoteSubmitForm';


class EditProjectPage extends Component {
  // constructor() {
  //   super()
  //   
  // }
  
  static defaultProps = {
    projects: []
  }
  
  componentDidMount() {
    const { params, setSelectedProject } = this.props;
    const { projectId } = params;
    
    setSelectedProject(projectId);
  }
  
  handleEditProjectSubmit = (project) => ({ projectName }) => {
    const { tasks, updateProject, remoteSubmit } = this.props;
    
    if (!hasAnyValue(projectName)) {
      remoteSubmit(null);
      
      throw new SubmissionError({
        singleInput: 'Project name is required' 
      })
    }
    
    updateProject(project, projectName);
    
    remoteSubmit(null);
    remoteSubmit('ADD_TASKS');
    remoteSubmit(null);  
    routeToProjects();
  } 
  
  handleRemoteSubmit() {
    const { remoteSubmit } = this.props;
    
    remoteSubmit('ADD_PROJECT');
  }  
  // handleEditProjectName = (project, updateProject) => ({ projectName }) => { 
  //   const { updateProject } = this.props;
  //     
  //     if (!hasAnyValue(projectName)) {
  //       throw new SubmissionError({
  //         projectName: 'Project name is required' 
  //       })
  //     }
  //     
  //   updateProject(project, projectName);  
  // }
    
  // handleNewChangesSubmit() {
  //   const { remoteSubmit } = this.props;
  //   console.log('asdf')
  //   
  //   this.handleEditProjectName();
  //   this.handleTasksSubmit();
  //   remoteSubmit(null);
  // 
  // handleTasksSubmit({ tasks }) {
  //   const { updateTasks, selectedProjectId } = this.props;
  //   updateTasks(selectedProjectId, tasks);
  
  
  // }

  render() {
    const { selectedProject, params } = this.props;
    const { projectId } = params;
    
    return (
      <div className="fullscreen-form form-page">
        <h2>Edit Project <span>{selectedProject.projectName}</span></h2>
        <ProjectTaskForm 
          handleCancel={routeToProjects}
          handleSubmit={this.handleRemoteSubmit.bind(this)}
          shouldDisableTaskFormFocus={true}
          showTasksForSelectedProject={true}
        >
          {/* <RemoteSubmitForm
            onTargetUpdate={this.handleEditProjectSubmit(selectedProject)}
            targetValue="ADD_PROJECT" 
            targetPropKey="remoteSubmitForm"
          > */}
            <SingleInputForm
              formName={"projectName"}
              placeholder={"Project Name"}
              shouldRenderSubmitButton={false}
            />
          {/* </RemoteSubmitForm>          */}
        </ProjectTaskForm>
      </div>  
    );
  }
}
const mapStateToProps = (state) => {
  const { selectedProjectId, projects } = state;
  
  const selectedProject = state.projects.length && selectedProjectId 
  ? projects.items.find((project) => project.shortId === selectedProjectId).projectName
  : 'No Projects Loaded'
  
  return {
    projects,
    selectedProjectId,
    selectedProject: { projectName: 'tester' }, 
  }
}

export default connect(mapStateToProps, { 
  addTask,
  deleteTask,
  remoteSubmit,
  setSelectedProject,
  updateProject,
  updateTasks
})(EditProjectPage);  

EditProjectPage.propTypes = {
  projects: PropTypes.object
}