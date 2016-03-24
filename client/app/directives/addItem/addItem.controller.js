import _ from 'lodash';

class AddItemController {

  constructor($scope, $injector, User) {
    angular.extend(this, $scope);
    
    this.Factory = $injector.get(this.factoryName);
    this.User = User;

    this.currentUsers = [];
    this.allUsers = [];

    $scope.$watch('currentItem', item => {
      this.currentItem = item;
      this.getCurrentUsers();
    });

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
      this.currentUsers.forEach((user) => {

        this.Factory.addToUser({
          itemId: this.currentItem._id,
          userId: user._id
        });
      });
    });
  }

  onAddUser(user){
    // Remove user from item on the server
    if(this.currentItem._id){    
      console.log(user);
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

  // If itemId is defined will look up data from db
  // getCurrentItemData(){
  //   this.Factory.getById(this.currentItem._id)
  //   .then(item => {
  //     this.currentItem = item;
  //     return this.Factory.getUsersById(this.currentItem._id);
  //   })
  //   .then(itemUsers => {
  //     this.currentUsers = itemUsers;
  //   });
  // }
}

AddItemController.$injector = ['$scope', '$injector', 'User'];

export {AddItemController};
