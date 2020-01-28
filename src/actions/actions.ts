export enum ACTION_TYPES {
  UPDATE_APP_LOADING = 'UPDATE_APP_LOADING'
}

export const updateAppLoading = (bool: boolean) => {
  return {
    type: ACTION_TYPES.UPDATE_APP_LOADING,
    bool,
  }
}