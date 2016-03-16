
class TestController {
  constructor(User, Organization) {
    this.Organization = Organization;
    this.User = User;

    this.loggedInUser = {};

    this.orgId = "56e8b61c9f1a60651b8c5932";

    this.User.getLoggedInUser()
      .then(user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      });
  }

}

TestController.$inject = ['User', 'Organization'];

export {TestController};
