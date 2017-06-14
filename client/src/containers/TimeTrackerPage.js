import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decrementTimer, fetchProjects, setActiveProject } from '../actions/indexActions';


import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  componentDidMount() {
    const { activeProjectId, projects, fetchProjects, setActiveProject } = this.props;
    
     if (!activeProjectId && projects.length) {
       setActiveProject(projects[0].shortId)
     }
    
    fetchProjects();
}

render() {
  const { activeProjectId, decrementTimer, projects, setActiveProject } = this.props;
  const activeProjectIndex = activeProjectId && projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = !isNaN(activeProjectIndex) && projects[activeProjectIndex];
  const selectedTasks = activeProject && activeProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        activeProject={activeProject || null}
        decrementTimer={decrementTimer}
        projects={projects}
        setActiveProject={setActiveProject}
        tasks={selectedTasks || []}
      />
    </div>
  );
}
}

const mapStateToProps = state => {
  const { activeProjectId, projects } = state;
  
  return {
    activeProjectId,
    projects
  }
}

export default connect(mapStateToProps, {
  fetchProjects,
  decrementTimer,
  setActiveProject,
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
