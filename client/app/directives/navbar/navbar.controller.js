class NavbarController {
  constructor($state) {
    
    this.$state = $state;

    this.logo = "Sage"

    this.links = [{
      title: 'test',
      state: 'test'
    }, {
    	title: 'dashboard',
    	state: 'dashboard'
    }, {
      title: 'organization',
      state: 'organization'
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
