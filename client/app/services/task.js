export const tasks = ($http) => {
  /**
  * Returns a single task by id
  * @param  {[string]} taskId [task._id]
  * @return {[object]}        [task]
  */
  const getById = (taskId) => {
    return $http({
      method: 'GET',
      url: '/api/tasks/' + taskId
    })
    .then((resp) => resp.data);
  };

  /**
  * Update a task
  * @param  {[object]} data [{_id:<REQUIRED>, name, description, isCompleted}]
  * @return {[object]}      [updated task]
  */
  const update = (data) => {
    return $http({
      method: 'PUT',
      url: '/api/tasks/',
      data: JSON.stringify(data)
    })
    .then((resp) => resp.data);
  };

  const isTaskAssigned = (data) => {
    return $http({
      method: 'POST',
      url: '/api/tasks/assign',
      data: JSON.stringify(data)
    })
    .then((resp) =>resp.data);
  };

  /**
  * Get all users assigned to a task
  * @param  {[string]} taskId [task._id]
  * @return {[array]}         [array of user objects]
  */
  const getUsersById = (taskId) => {
    console.log("in factory", taskId);
    return $http({
      method: 'GET',
      url: '/api/tasks/users/' + taskId
    })
    .then((resp) => resp.data);
  };

  /**
  * Create a new task for a project
  * Must include parent project id and task name
  * @param  {[object]} data [{projectId:<REQUIRED>, name:<REQUIRED>, description}]
  * @return {[object]}      [updated project]
  */
  const createNew = (data) => {
    return $http({
      method: 'POST',
      url: '/api/tasks/create',
      data: JSON.stringify(data)
    })
    .then((resp) => resp.data);
  };

  /**
  * Deletes a task by id
  * @param  {[object]} task [description]
  * @return {[object]}        [removed task]
  */
  const remove = (task) => {
    return $http({
      method: 'DELETE',
      url: '/api/tasks/' + task._id
    })
    .then((resp) => resp.data);
  };

  const addToUser = (data) => {
    return $http({
      method: 'POST',
      url: '/api/users/tasks',
      data: {
        userId: data.userId,
        taskId: data.itemId
      }
    })
    .then(resp => resp.data);
  };

  const removeFromUser = (data) => {
    return $http({
      method: 'POST',
      url: '/api/users/tasks/remove',
      data: {
        userId: data.userId,
        taskId: data.itemId
      }
    })
    .then(resp => resp.data);
  };

  return {getById, update, getUsersById, createNew, remove, addToUser, removeFromUser}

};


tasks.$inject = ['$http'];