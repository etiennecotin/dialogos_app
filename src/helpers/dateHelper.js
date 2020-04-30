export const checkDateDifference = startedAt => {
  let startedDate = new Date(startedAt.seconds * 1000); // date object
  let actualDate = new Date(); // date object

  return Math.trunc((actualDate.getTime() - startedDate.getTime()) / 1000) / 60;
};
