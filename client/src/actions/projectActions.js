import shortid from 'shortid';

import { submit } from 'redux-form';
export const ADD_PROJECT = "ADD_PROJECT";
export function addProject(projectName) {
  const newProject = {
    projectName,
    tasks: [],
    shortId: shortid.generate()
  }
  
  return {
    type: "ADD_PROJECT",
    project: newProject
  }
}

export const EDIT_PROJECT_NAME_REQUEST = "EDIT_PROJECT_NAME_REQUEST";
export function editProjectName(projectId, projectName) {
  return {
    type: "EDIT_PROJECT_NAME_REQUEST",
    projectId,
    projectName
  }
}

export const QUEUE_NEW_PROJECT = "QUEUE_NEW_PROJECT";
export function queueNewProject(projectName) {
  return {
    type: "QUEUE_NEW_PROJECT",
    projectName
  }
}

export const EDIT_TASK_REQUEST = "EDIT_TASK_REQUEST";
export function editTask(projectId, taskId, toUpdate) {
  return {
    type: "EDIT_TASK_REQUEST",
    projectId,
    taskId,
    toUpdate
  }
}

export const UPDATE_TASKS = "UPDATE_TASKS";
export function updateTasks(projectId, newTasks) {
  return {
    type: "UPDATE_TASKS",
    projectId,
    newTasks
  }
}

export const SET_SELECTED_PROJECT = "SET_SELECTED_PROJECT";
export function setSelectedProject(projectId) {
  return {
    type: "SET_SELECTED_PROJECT",
    projectId
  }
}

export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
export function deleteTaskRequest(projectId, taskId) {
  return {
    type: 'DELETE_TASK_REQUEST',
    projectId,
    taskId
  }
}

export const POST_PROJECT_REQUEST = 'POST_PROJECT_REQUEST'; 
export function postProjectRequest(project) {
  return {
    type: 'POST_PROJECT_REQUEST',
    project
  }
}

export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS'; 
export function postProjectSuccess(projectId, databaseId) {
  return {
    type: 'POST_PROJECT_SUCCESS',
    projectId,
    databaseId
  }
}

export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS'; 
export function postTaskSuccess(projectId, taskId, databaseId) {
  return {
    type: 'POST_TASK_SUCCESS',
    projectId,
    taskId,
    databaseId
  }
}

export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'; 
export const fetchProjectsSuccess = (projects) => ({
  type: 'FETCH_PROJECTS_SUCCESS',
  projects
});

export const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
export function fetchProjects() {
  return (dispatch) => {
    
    dispatch({ type: 'TOGGLE_FETCHING' })
    
    fetch('projects')
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchProjectsSuccess(data.projects));
    })
  }
}

export function postProject(projectName, tasks) {
  return (dispatch) => {
    
    const newProject = {
      projectName,
      shortId: shortid.generate(),
      tasks: tasks || []
    }
    
    dispatch(postProjectRequest(newProject));
    
    fetch(
      'projects',
      {
          method: "POST",
          body: JSON.stringify(newProject),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        const projectId = data.shortId;
        const databaseId = data._id;
        
        dispatch(postProjectSuccess(projectId, databaseId));
      })
      
  }
}

export function postProjectWithTasks(tasks) {
  return (dispatch, getState) => {
    //dispatch(submit('addProjectForm')).then(() => console.log('hello'))
    
    // const newProjectName = getState().projects.queue;
    // console.log(newProjectName);
    // console.log(tasks)
    // dispatch(postProject(newProjectName, tasks));
  }
}

export function updateProject(project, newName) {
  return (dispatch) => {
    // console.log(project, newName)
    dispatch(editProjectName(project.shortId, newName)); 
      
    fetch(
      `projects/${project._id}`,
      {
          method: "PUT",
          body: JSON.stringify({ projectName: newName,  }),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        console.log('update success')
      })
  }
}

export function postTask(projectId, task) {
  return (dispatch) => {
    fetch(
      `projects/${projectId}`,
      {
          method: "POST",
          body: JSON.stringify(task),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        const taskId = data.shortId;
        const databaseId = data._id;
        
        dispatch(postTaskSuccess(projectId, taskId, databaseId));
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function updateTask(project, task, toUpdate) {
  return (dispatch) => {
    dispatch(editTask(project.shortId, task.shortId, toUpdate))
    
    fetch(
      `projects/${project._id}/tasks/${task._id}`,
      {
        method: "PUT",
        body: JSON.stringify(toUpdate),
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        'console log update success'
      })
    }    
}

export const DELETE_PROJECT_REQUEST= 'DELETE_PROJECT_REQUEST';
export function deleteProject(project) {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_PROJECT_REQUEST',
      project
    })
    
    fetch(
      `projects/${project._id}`,
      {
        method: "DELETE",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      })
    })
  }
}

export function deleteTask(project, task, shouldUpdateLocalState) {
  return (dispatch) => {
    if (shouldUpdateLocalState) {
      dispatch(deleteTaskRequest(project.shortId, task.shortId));
    }
    
    fetch(
      `projects/${project._id}/tasks/${task._id}`,
      {
          method: "DELETE",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      });
  }
}