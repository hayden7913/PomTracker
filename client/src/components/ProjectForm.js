import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ProjectForm extends Component {
  render() {
    const { handleSubmit, params } = this.props;
    const { projectId } = params;
    
    return (
      <form className="project-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
ProjectForm = reduxForm({
  form: 'project' // a unique name for this form
})(ProjectForm);

export default ProjectForm;