
class OrganizationController {
  constructor($stateParams, Organization) {
    this.organizationId = $stateParams.id;

    this.organization = {};

    if(this.organizationId){
      Organization.getById(this.organizationId)
      .then(org => this.organization = org);  
    }
  }

  onUpdate(updatedOrg){
    this.organization = updatedOrg;
  }
}

OrganizationController.$inject = ['$stateParams', 'Organization'];

export {OrganizationController};
