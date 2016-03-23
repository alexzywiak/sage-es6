
class TestController {
  constructor(User, Organization) {
    this.Organization = Organization;
    this.User = User;

    this.projects = [];
    this.factoryName = 'Project';

    this.loggedInUser = {};

    this.organizationId = "56e8b61c9f1a60651b8c5932";

    this.Organization.getById(this.organizationId)
      .then( org => {
        this.org = org;
        this.projects = org.projects;
      });

    this.User.getLoggedInUser()
      .then(user => {
        this.loggedInUser = user;
      });
  }

}

TestController.$inject = ['User', 'Organization'];

export {TestController};
