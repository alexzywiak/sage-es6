
class AssignUserController {
  constructor($scope) {
    angular.extend(this, $scope);

    this.filteredAllUsers = [];

    $scope.$watch('currentUsers', (users) => {
      this.currentUsers = users;
      this.filterAllUserList();
    });

    $scope.$watch('allUsers', (users) => {
      this.allUsers = users;
      this.filterAllUserList();
    });
  }

  filterAllUserList(){
    console.log(this.allUsers, this.currentUsers, this.filteredAllUsers);
    // Filter out any users already assigned to the organization
    let currentUserIds = this.currentUsers.reduce((dict, user) => {
      dict[user._id] = true;
      return dict;
    }, {});
    this.filteredAllUsers = _.reject(this.allUsers, (user) => {
      return currentUserIds[user._id];
    });
  }

  handleAddUser(index){
    let user = this.filteredAllUsers[index];
    this.onAddUser({user});
  }

  handleRemoveUser(index){
    let user = this.currentUsers[index];
    this.onRemoveUser({user});
  }

}

AssignUserController.$inject = ['$scope'];

export {AssignUserController};
