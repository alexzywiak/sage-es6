
class ProjectListItemController {
  constructor($scope, $injector) {
    angular.extend(this, $scope);
    console.log(this.factoryName);
    this.Factory = $injector.get(this.factoryName);
    this.users = [];

    if(this.item._id){
      this.Factory.getUsersById(this.item._id)
        .then( users => {
          this.users = users;
        });
    }
  }

  handleDelete(_id){
    this.onDelete({_id: this.project._id});
  }

}

ProjectListItemController.$inject = ['$scope', '$injector'];

export {ProjectListItemController};
