
class TestController {
  constructor(User, Organization) {
    this.Organization = Organization;
    this.User = User;

    this.items = [1,2,3,4,5];

    this.loggedInUser = {};

    this.organizationId = "56e8b61c9f1a60651b8c5932";

    this.User.getLoggedInUser()
      .then(user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      });
  }

}

TestController.$inject = ['User', 'Organization'];

export {TestController};
