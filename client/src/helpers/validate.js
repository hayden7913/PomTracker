  
  function isUndefined(value) {
    if (typeof value === 'undefined' || value === undefined) {
      return true;
    }
    return false;
  }
  
  export function hasAnyValue(value) {
    if (isUndefined(value) || String(value).trim() === '') {
      return false;
    }
    return true;
  }

  export function isDuplicate(value, array) {
      if (array.indexOf(value) === -1) {
        return false;
      }
      return true;
  }
  
  export default function validate(getState) {
    return ({ singleInput }) => {
      const projectNames = getState().projects.items.map(project => project.projectName);
      const error = {};
      
      if (isDuplicate(singleInput, projectNames)) {
        error.singleInput = `A project with the name '${singleInput}' already exists`;
      }
      
      return error;
    }
  }
  