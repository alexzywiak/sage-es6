class NavbarController {
  constructor($state) {
    
    this.$state = $state;

    this.logo = "Sage"

    this.links = [{
    	title: 'dashboard',
    	state: 'dashboard'
    }, {
      title: 'organization',
      state: 'organization({id:""})'
    }];
  }

  logout() {
    this.$state.go('login');
  }

  handleClick(click){
    if(click){
      this[click]();
    }
  }
}

NavbarController.$inject = ['$state'];

export {
  NavbarController
};
