import axios from 'axios';
import errors from '../../errors';
import { throwInternalError } from '../../utils/errors';

const isNetworkError = (err) => {
  if (err.message === 'Network Error') {
    return true;
  }

  return false;
};

const parseAxiosError = (err) => {
  if (isNetworkError(err)) {
    throwInternalError(errors.NETWORK_ERROR());
  }

  const { data, status } = err.response;

  throwInternalError({
    code: data.errorCode,
    message: data.message,
    details: data.details,
    HTTPStatus: status,
  });
};

// eslint-disable-next-line import/prefer-default-export
export const getUser = async () => {
  let result;
  // eslint-disable-next-line no-useless-catch
  try {
    result = await axios({
      method: 'GET',
      url: 'http://localhost:4000/user',
    });
  } catch (err) {
    parseAxiosError(err);
  }
  return result.data;
};
