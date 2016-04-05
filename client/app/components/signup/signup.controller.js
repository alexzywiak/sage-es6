
class SignupController {
  constructor(Auth) {
    this.Auth = Auth;
    this.user = {};
  }

  handleSignup(){
    console.log(this.user);
    if(this.user.username && this.user.password){
      this.Auth.signUp(this.user)
        .then(resp => {
          console.log(resp);
        });
    }
  }

}

SignupController.$inject = ['Auth'];

export {SignupController};
