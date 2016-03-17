
export const projects = ($http) => {
  

  const createNew = (data) => {
    return $http({
      method: 'POST',
      url: 'api/projects/create',
      data: {
        orgId: data.parentId,
        name: data.name,
        description: data.description
      }
    }).then(resp => resp.data);
  };

  const getById = (projectId) => {
    return $http({
      method: 'GET',
      url: 'api/projects/' + projectId
    }).then(resp => resp.data);
  };

  const getUsersById =  (projectId) => {
    return $http({
      method: 'GET',
      url: 'api/projects/users/' + projectId
    }).then(resp => resp.data);
  };

  const remove = (projectId) => {
    return $http({
      method: 'DELETE',
      url: 'api/projects/' + projectId
    }).then(resp => resp.data);
  };

  const update = (projectId, newData) => {
    return $http({
      method: 'PUT',
      url: 'api/projects',
      data: newData
    }).then(resp => resp.data);
  };

  const getAll = () => {
    return $http({
      method: 'GET',
      url: 'api/projects'
    }).then(resp => resp.data);
  };

  const addToUser = (data) => {
    return $http({
      method: 'POST',
      url: 'api/users/projects',
      data: {
        userId: data.userId,
        projectId: data.itemId
      }
    })
    .then(resp => resp.data);
  };

  const removeFromUser = (data) => {
    return $http({
      method: 'POST',
      url: 'api/users/projects/remove',
      data: {
        userId: data.userId,
        projectId: data.itemId
      }
    })
    .then(resp => resp.data);
  };

  return {getAll, getById, createNew, update, remove, addToUser, removeFromUser}
};

projects.$inject = ['$http'];