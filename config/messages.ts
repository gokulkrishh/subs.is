const messages = {
  account: {
    delete: {
      missingEmail: 'Email Id is missing',
      error: 'Unable to delete your account, try again',
      success: 'Account has been deleted successfully',
    },
  },
  subscriptions: {
    update: {
      success: 'Subscription updated successfully',
      error: 'Unable to update, try again',
    },
    reminderSuccess: (notify: boolean, name: string) => {
      return `Email reminder is ${!notify ? 'enabled' : 'disabled'} for ${name}`;
    },
    reminderError: (notify: boolean) => {
      return `Unable to ${!notify ? 'enable' : 'disable'} reminder`;
    },
    active: (active: boolean, name: string) => {
      return `${name} subscription is ${active ? 'in-active' : 'active'}`;
    },
    makeActiveError: `Make the subscription active to enable reminder`,
    activeError: (active: boolean) => {
      return `Unable to mark it ${active ? 'in-active' : 'active'}`;
    },
    delete: {
      success: 'Subscription deleted successfully',
      error: 'Unable to delete, try again',
    },
  },
  user: {
    notAuth: 'User is not authenticated',
    fetchError: 'Error while fetching auth user',
    update: {
      error: 'Unable to update, try again',
    },
    filter: {
      error: 'Unable to save summary filter.',
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
  share: {
    error: 'Failed to share subscription',
  },
  feedback: {
    success: 'Feedback sent successfully',
    error: 'Unable to send feedback, try again',
  },
};

export default messages;
