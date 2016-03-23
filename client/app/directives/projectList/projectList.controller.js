
class ProjectListController {
  constructor($scope, Project) {
    angular.extend(this, $scope);

    this.Project = Project;

    $scope.$watch('projects', projects => {
      this.projects = projects;
    });
  }

  onDelete(_id){
    this.Project.remove(_id)
      .then(() => {
        this.projects = this.projects.filter(project => {
          return project._id !== _id;
        });
      });
  }
}

ProjectListController.$inject = ['$scope', 'Project'];

export {ProjectListController};
