export const CommandData = {
  name: 'slots-info-one-day',
  description: 'Sends info about available vaccine slots for a specific date',
  options: [
    {
      name: 'pincode',
      type: 'INTEGER',
      description: 'The pincode of the place you want to search vaccine centers in',
      required: true,
    },
    {
      name: 'date',
      type: 'STRING',
      description: 'The date you want info for',
      required: true,
    },
  ],
};
