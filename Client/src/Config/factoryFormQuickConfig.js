export const formSetup = {
    userId: '', // This will be dynamically assigned
    operation: 'create', // or 'update', depending on the context
    fields: [
      {
        name: 'factoryName',
        label: 'Factory Name',
        validation: {
          required: true,
          pattern: /^[a-zA-Z0-9\s]+$/,
          errorMessage: "Factory name can only contain letters, numbers, and spaces.",
        }
      },
      {
        name: 'factoryAddress',
        label: 'Factory Address',
        validation: {
          required: true,
          pattern: /^[a-zA-Z0-9\s]+$/,
          errorMessage: "Factory address can only contain letters, numbers, and spaces.",
        }
      }
    ]
  };
  