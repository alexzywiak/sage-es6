
class TestController {
  constructor(User, Organization) {
    this.Organization = Organization;
    this.User = User;

    this.projects = [];
    this.project = {_id:0, name:'project0', description:'project0'};

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
