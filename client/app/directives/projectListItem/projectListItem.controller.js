
class ProjectListItemController {
  constructor($scope) {
    angular.extend(this, $scope);
  }

  handleDelete(_id){
    this.onDelete({_id: this.project._id});
  }

}

ProjectListItemController.$inject = ['$scope'];

export {ProjectListItemController};
