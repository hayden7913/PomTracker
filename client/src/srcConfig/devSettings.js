const productionMode = true;
export const isOnboardingActive = productionMode ? false : true;
export const modalType = productionMode ? "WELCOME" : "ADD_PROJECT";
const renderModal = false; 
export const renderFormModal = productionMode ? false : (isOnboardingActive || renderModal);
export const showProgressBar = true || false;
export const isDevOnboardingActive = isOnboardingActive;
