
class TaskController {
  constructor($state, $stateParams, Task) {
    this.taskId = $stateParams.id;

    this.task = {};

    // Needs a task to reference
    if(!this.taskId){
      $state.go('dashboard');
    } else {
      Task.getById(this.taskId)
        .then(task => this.task = task);
    }
  }

}

TaskController.$inject = ['$state', '$stateParams', 'Task'];

export {TaskController};
