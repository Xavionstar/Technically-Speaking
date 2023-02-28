//this helper will make the date data be displayed in just mm/dd/yyyy
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
 
};
