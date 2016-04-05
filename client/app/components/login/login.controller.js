
class LoginController {
  constructor($state, Auth) {
    this.Auth = Auth;
    this.$state = $state;
    this.user = {};
  }

  handleLogin(){
    if(this.user.username && this.user.password){
      this.Auth.login(this.user)
        .then(resp => {
          this.$state.go('dashboard');
        });
    }
  }

}

LoginController.$inject = ['$state', 'Auth'];

export {LoginController};
