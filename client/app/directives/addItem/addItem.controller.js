import _ from 'lodash';

class AddItemController {

  constructor($scope, $injector, $q, $state, User) {
    angular.extend(this, $scope);
    
    this.$q = $q;
    this.$state = $state;
    this.Factory = $injector.get(this.factoryName);
    this.User = User;

    this.currentUsers = [];
    this.allUsers = [];

    $scope.$watch('currentItem', item => {
      this.currentItem = item;
      this.getCurrentUsers();
    });

    // Checks to assign current user by default when creating new item
    if(!this.currentItem._id && this.assignCurrentUser){
      this.User.getLoggedInUser()
      .then(user => this.currentUsers.push(user));
    }

    this.User.getAll()
    .then(users => {this.allUsers = users});
  }

  getCurrentUsers(){
    if(this.currentItem._id && !this.currentUsers.length){
      this.Factory.getUsersById(this.currentItem._id)
      .then( users => this.currentUsers = users);
    }
  }

  handleSubmit(){
    if(this.currentItem._id){
      this.updateItem();
    } else {
      this.createNewItem();
    }
  }

  // Will update an existing entry if itemId is defined
  updateItem(){
    this.Factory.update(this.currentItem)
    .then(resp => resp);
  }

  // Will create a new entry if itemId is not defined
  createNewItem(){
    this.Factory.createNew(this.currentItem)
    .then(resp => {
      this.currentItem._id = resp._id;
      this.currentItem = resp;
      // Add all users to the new organization
      this.$q.all(
        this.currentUsers.map(user => {
          return this.Factory.addToUser({
            itemId: this.currentItem._id,
            userId: user._id
          });
        })
        ).then(() => {
          this.$state.go('organization', {id: this.currentItem._id});
        });
      });
  }

  onAddUser(user){
    // Remove user from item on the server
    if(this.currentItem._id){    
      this.Factory.addToUser({
        itemId: this.currentItem._id,
        userId: user._id
      });
    }
    // Add new user to current user list
    this.currentUsers.push(user);
  }

  onRemoveUser(user){
    // Remove user from item on server
    if(this.currentItem._id){    
      this.Factory.removeFromUser({
        itemId: this.currentItem._id,
        userId: user._id
      });
    }
    // Remove user from current user list
    this.currentUsers = _.reject(this.currentUsers, (currentUser) => {
      return currentUser._id === user._id;
    });
  }
}

AddItemController.$injector = ['$scope', '$injector', '$q', '$state', 'User'];

export {AddItemController};
