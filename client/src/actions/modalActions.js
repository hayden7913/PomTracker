

export const TOGGLE_IS_MODAL_ACTIVE = 'TOGGLE_IS_MODAL_ACTIVE';
export const toggleIsModalActive = () => ({
  type: 'TOGGLE_IS_MODAL_ACTIVE',
});

export const TOGGLE_IS_FORM_MODAL_ACTIVE = 'TOGGLE_IS_FORM_MODAL_ACTIVE';
export const toggleIsFormModalActive = () => ({
  type: 'TOGGLE_IS_FORM_MODAL_ACTIVE',
});



export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export const changeModalType = modalType => ({
  type: 'CHANGE_MODAL_TYPE',
  modalType,
});

export const UPDATE_MODAL_PROPS = 'UPDATE_MODAL_PROPS';
export const updateModalProps = modalProps => ({
  type: 'UPDATE_MODAL_PROPS',
  modalProps,
});

export const CONFIRM_PROJECT_DELETE = 'CONFIRM_PROJECT_DELETE';
export const confirmProjectDelete = modalProps => ({
  type: 'CONFIRM_PROJECT_DELETE',
  modalProps,
  modalType: 'CONFIRM',
});
