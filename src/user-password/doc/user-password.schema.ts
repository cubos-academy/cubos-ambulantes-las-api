export const userPasswordOkSchema = {
  message: 'Password updated successfully',
};

export const userPasswordUnauthorizedSchema = {
  statusCode: 401,
  message: 'Old password are incorrect',
  error: 'Unauthorized',
};
