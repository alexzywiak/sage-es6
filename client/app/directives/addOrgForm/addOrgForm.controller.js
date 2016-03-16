import _ from 'lodash';

class AddOrgFormController {
  constructor($scope, Organization, User) {
    angular.extend(this, $scope);
    
    this.Organization = Organization;
    this.User = User;

    this.currentOrganization = {};
    this.currentUsers = [];
    this.allUsers = [];

    if(this.organizationId){
      this.getCurrentOrganizationData();
    }

    this.User.getAll()
    .then(users => {console.log(users); this.allUsers = users});
  }

  handleSubmit(){
    if(this.organizationId){
      this.Organization.update(this.currentOrganization)
      .then(resp => console.log(resp));
    } else {
      this.Organization.createNew(this.currentOrganization)
      .then(resp => {
        this.organizationId = resp._id;
        this.currentOrganization = resp;
        // Add all users to the new organization
        this.currentUsers.forEach((user) => {
          this.Organization.addToUser({
            orgId: this.organizationId,
            userId: user._id
          });
        });
      });
    }
  }

  onAddUser(user){
    if(this.organizationId){    
      this.Organization.addToUser({
        orgId: this.organizationId,
        userId: user._id
      });
      this.getCurrentOrganizationData();
    } else {
      // Build up users to add to the organization when it's created
      this.currentUsers.push(user);
    }
  }

  onRemoveUser(user){
    if(this.organizationId){    
      this.Organization.removeFromUser({
        orgId: this.organizationId,
        userId: user._id
      });
    } else {
      // Remove users from the temp user array
      this.currentUsers = _.reject(this.currentUsers, (currentUser) => {
        return currentUser._id === user._id;
      });
      this.getCurrentOrganizationData();
    }
  }

  getCurrentOrganizationData(){
    this.Organization.getById(this.organizationId)
    .then(org => {
      this.currentOrganization = org;
      return this.Organization.getUsersById(this.organizationId);
    })
    .then(orgUsers => {
      this.currentUsers = orgUsers;
    });
  }
}

AddOrgFormController.$inject = ['$scope', 'Organization', 'User'];

export {AddOrgFormController};
