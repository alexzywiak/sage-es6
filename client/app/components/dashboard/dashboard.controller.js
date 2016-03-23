
class DashboardController {
  constructor($scope, User) {
    this.User = User;
    
    this.loggedInUser = {};
    
    this.User.getLoggedInUser()
    .then(user => {
      console.log(user);
      this.loggedInUser = user;
    });
  }

}

DashboardController.$inject = ['$scope', 'User'];

export {DashboardController};
