import {omit} from 'lodash';

export const users = ($http, $q, $window, $state, Auth, API) => {

  let allUsers = null;
  let currentUser = null;

  /**
  * Gets user info for logged in user
  * @return {[promise]} [resolves with user or false if not logged in]
  */
  const getLoggedInUser = () => {
    //return Auth.getLoggedInUser();
    return getUserById('56e8b4f29f1a60651b8c592c');
  };

  /**
  * Returns all users
  * @return {[array]} [array of user objects]
  */
  const getAll = () => {
    return $http({
      method: 'GET',
      url: '/api/users/all'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  /**
  * Returns a user by id with all assigned
  * organizations, tasks, and projects
  * @param  {[string]} id [user's Id]
  * @return {[object]}    [userObject]
  */
  const getUserById = (id) => {
    id = id || '';
    return $http({
      method: 'GET',
      url: '/api/users/' + id
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  /**
  * Pass in updated user data
  * @param  {[object]} data [{_id:<REQUIRED>, username, email}]
  * @return {[object]}      [updated user object]
  */
  const updateUser = (data) => {
    return $http({
      method: 'PUT',
      url: '/api/users',
      data: data
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {getLoggedInUser, getAll, getUserById, updateUser};
};

    users.$inject = ['$http', '$q', '$window', '$state', 'Auth', 'API'];
