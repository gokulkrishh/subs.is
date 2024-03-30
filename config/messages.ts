const messages = {
  account: {
    delete: {
      missingEmail: 'Email Id is missing',
      error: 'Unable to delete your account, try again',
      success: 'Account has been deleted successfully',
    },
  },

  user: {
    notAuth: 'User is not authenticated',
    fetchError: 'Error while fetching auth user',
    update: {
      error: 'Unable to update, try again',
    },
    currrency: {
      update: {
        success: 'Currency updated successfully',
      },
    },
  },
  export: {
    error: 'Unable to export, try again',
  },
};

export default messages;
