
class SignupController {
  constructor($state, Auth) {
    this.$state = $state;
    this.Auth = Auth;
    this.user = {};
  }

  handleSignup(){
    if(this.user.username && this.user.password){
      this.Auth.signUp(this.user)
        .then(resp => {
          this.$state.go('dashboard');
        });
    }
  }

}

SignupController.$inject = ['$state', 'Auth'];

export {SignupController};
