//custom error handler
export const errorHandler = (statuscode, message) => {
  const error = new Error(message);
  error.status = statuscode;
  error.message = message;
  return error;
};
