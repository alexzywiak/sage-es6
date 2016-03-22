class NavbarController {
  constructor($state) {
    
    this.$state = $state;

    this.logo = "Sage"

    this.links = [{
      title: 'test',
      state: 'test'
    }, {
    	title: 'login',
    	state: 'login'
    }, {
    	title: 'signup',
    	state: 'signup'
    },{
      title: 'logout',
      click: 'logout'
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
