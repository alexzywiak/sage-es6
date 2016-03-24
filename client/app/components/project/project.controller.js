
class ProjectController {
  constructor($state, $stateParams, Project) {
    this.projectId = $stateParams.id;

    this.project = {};

    // Must have a project id
    if(!this.projectId){
      $state.go('dashboard');
    } else {
      Project.getById(this.projectId)
        .then(project => this.project = project);
    }
  }

}

ProjectController.$inject = ['$state', '$stateParams', 'Project'];

export {ProjectController};
