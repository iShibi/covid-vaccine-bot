export const CommandData = {
  name: 'slots-info-one-week',
  description: 'Sends info about available vaccine slots for next seven days starting from a specific date',
  options: [
    {
      name: 'pincode',
      type: 'INTEGER',
      description: 'The pincode of the place you want to search vaccine centers in',
      required: true,
    },
    {
      name: 'start_date',
      type: 'STRING',
      description: 'The date you want the info to start from',
      required: true,
    },
  ],
};
