class NavbarController {
  constructor($state, Auth) {
    
    this.Auth = Auth;
    this.$state = $state;

    this.logo = "Sage";

    this.links = [{
    	title: 'dashboard',
    	state: 'dashboard'
    }, {
      title: 'login',
      state: 'login'
    }, {
      title: 'signup',
      state: 'signup'
    }, {
      title: 'logout',
      click: 'logout',
      state: 'login'
    }];
  }

  logout() {
    this.Auth.logout();
  }

  handleClick(click){
    if(click){
      this[click]();
    }
  }
}

NavbarController.$inject = ['$state', 'Auth'];

export {
  NavbarController
};
