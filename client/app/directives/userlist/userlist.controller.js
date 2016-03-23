
class UserListController {
  constructor($scope, $injector) {
    angular.extend(this, $scope);

    this.Factory = $injector.get(this.factoryName);
    this.users = [];

    if(this.item._id){
      this.Factory.getUsersById(this.item._id)
      .then( users => {
        this.users = users;
      });
    }
  }
}

UserListController.$inject = ['$scope', '$injector'];

export {UserListController};
