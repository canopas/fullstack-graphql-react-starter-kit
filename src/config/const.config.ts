const roles = {
  ADMIN: 1,
  OWNER: 2,
  USER: 3,
};

const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

const businessTypes = {
  RESTAURANT: 1,
};

export { roles, statusCodes, businessTypes };
