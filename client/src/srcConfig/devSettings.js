const productionMode = false;
export const isOnboardingActive = productionMode ? false : false;
export const modalType = productionMode ? "WELCOME" : "WELCOME";  
const renderModal = false; 
export const renderFormModal = productionMode ? false : (isOnboardingActive || renderModal);
export const showProgressBar = true || false;
