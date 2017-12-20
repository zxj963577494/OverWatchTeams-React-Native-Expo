import axios from 'axios';
const headers = {
  Accept: 'application/json',
};

function request(method, url, axiosConfig = {}) {
  const options = Object.assign(
    {},
    {
      method,
      url,
      headers,
      responseType: 'json',
    },
    headers,
    axiosConfig,
  );
  return axios(options);
}

export function post(url, { data = {}, params = {}, transformResponse = [] }) {
  return request('post', url, { data, params, transformResponse });
}

export function put(url, { data = {}, params = {}, transformResponse = [] }) {
  return request('put', url, { data, params, transformResponse });
}

export function get(url, { params = {}, transformResponse = [] }) {
  return request('get', url, { transformResponse, params });
}

export function destroy(url) { // delete
  return request('delete', url, {});
}