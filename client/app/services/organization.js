export const organization = ($http) => {

  const getAll = () => {
    return $http({
      method: 'GET',
      url: 'api/orgs/'
    }).then( resp => resp.data);
  };

  const getById =  (orgId) => {
    return $http({
      method: 'GET',
      url: 'api/orgs/' + orgId
    }).then(resp => resp.data);
  };

  const getUsersById = (orgId) => {
    return $http({
      method: 'GET',
      url: 'api/orgs/users/' + orgId
    }).then(resp => resp.data);
  };

  // {title: ... }
  const createNew = (newOrg) => {
    return $http({
      method: 'POST',
      url: '/api/orgs/',
      data: JSON.stringify(newOrg)
    }).then(resp => resp.data);
  };

  const update = (newData) => {
    return $http({
      method: 'PUT',
      url: 'api/orgs',
      data: newData
    }).then(resp => resp.data);
  };

  const remove = (orgId) => {
    return $http({
      method: 'DELETE',
      url: 'api/orgs/' + orgId
    }).then(function (resp) {
      return resp.data;
    });
  };

  /**
   * Add an organization to a user
   * Must include organizationId and userId in data
   * {organizationId:<organization._id>, userId:<user._id>}
   * @param {[object]} data [{organizationId:<REQUIRED>, userId:<REQUIRED>}]
   */
   const addToUser = (data) => {
    return $http({
      method: 'POST',
      url: '/api/users/orgs',
      data: {
        userId: data.userId,
        orgId: data.itemId
      }
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  const removeFromUser = (data) => {
    return $http({
      method: 'POST',
      url: '/api/users/orgs/remove',
      data: {
        userId: data.userId,
        orgId: data.itemId
      }
    })
    .then(function(resp) {
      return resp.data;
    });
  };


  return {
    getAll,
    getById,
    getUsersById,
    createNew,
    update,
    remove,
    addToUser,
    removeFromUser
  };
};

  organization.$inject = ['$http'];