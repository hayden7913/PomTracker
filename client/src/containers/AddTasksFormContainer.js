import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import shortid from 'shortid';

import { updateTasks } from '../actions/indexActions';

import AddTasksForm from '../components/AddTasksForm';

let AddTasksFormContainer = class extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tasks: []
    }
  }
  
  componentDidMount() {
    const { tasks } = this.props;
    
    this.setState({ tasks });
  }
  
  addTask({ taskName }) {
    const { tasks } = this.state;
    const newTask = {
      taskName,
      key: shortid.generate(),
      recordedTime: 0,
      shortId: shortid.generate(),
      shouldDelete: false
    }
    this.setState({ tasks: [...tasks, newTask] })
  }
  
  toggleShouldDelete = (taskId) => () => {
    const { tasks } = this.state;
    const newTasks = tasks.map(task => {
      if (task.shortId === taskId) {
        const shouldDelete = !task.shouldDelete;
        return Object.assign({}, task, { shouldDelete })
      }
      
      return task;
    })
    
    this.setState({ tasks: newTasks })
  }
  
  handleFormSubmit (){
    const { activeProjectId, updateTasks } = this.props;
    const { tasks } = this.state;
    
    const newTasks = tasks.filter((task) => !task.shouldDelete);
    updateTasks(activeProjectId, newTasks);
  }
  
  renderFormTask (task){
    const { shouldDelete, taskName, shortId } = task;
    
    return (
      <div className="task-form-list-item" key={shortId}>
        <div className="button-wrapper">
          <button onClick={this.toggleShouldDelete(shortId)}>{shouldDelete ? 'restore' : 'X' /*&times;*/}</button>
        </div>
        <span>{taskName}</span>
      </div>
    );
  }
  
  render() {
    const { handleSubmit } = this.props;
    const { tasks } = this.state;
    
    return (
      <AddTasksForm 
        handleFormSubmit={this.handleFormSubmit.bind(this)}
        handleSubmit={handleSubmit}
        handleTaskSubmit={this.addTask.bind(this)}
        renderFormTask={this.renderFormTask.bind(this)}
        tasks={tasks}
      />
    );
  }
}  

const validate = values => {
  if(values) {
    
  } else {
  }
}

const mapStateToProps = (state) => {
  const { projects } = state;
  
  const activeProjectId = state.activeProjectId || projects[0].shortId;
  const activeProjectIndex = projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = projects[activeProjectIndex];
  const tasks = activeProject.tasks.map(task => Object.assign(task, { shouldDelete: false }));
  
  return {
    activeProjectId,
    tasks
  }
}
AddTasksFormContainer = reduxForm({
  form: 'addTasks',
  validate,
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  updateTasks
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  handleSubmit: PropTypes.func,
  // tasks: PropTypes.array.isRequired,
}