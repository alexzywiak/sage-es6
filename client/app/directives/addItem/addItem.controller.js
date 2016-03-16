import _ from 'lodash';

class AddItemController {
  constructor($scope, $injector, User) {
    angular.extend(this, $scope);
    
    this.Factory = $injector.get(this.factoryName);
    this.User = User;

    this.currentItem = {};
    this.currentUsers = [];
    this.allUsers = [];

    if(this.itemId){
      this.getCurrentItemData();
    }

    this.User.getAll()
    .then(users => {console.log(users); this.allUsers = users});
  }

  handleSubmit(){
    console.log('handling');
    if(this.itemId){
      this.Factory.update(this.currentItem)
      .then(resp => console.log(resp));
    } else {
      this.Factory.createNew(this.currentItem)
      .then(resp => {
        this.itemId = resp._id;
        this.currentItem = resp;
        // Add all users to the new organization
        this.currentUsers.forEach((user) => {
          this.Factory.addToUser({
            itemId: this.itemId,
            userId: user._id
          });
        });
      });
    }
  }

  onAddUser(user){
    if(this.itemId){    
      this.Factory.addToUser({
        itemId: this.itemId,
        userId: user._id
      });
    }
    this.currentUsers.push(user);
  }

  onRemoveUser(user){
    if(this.itemId){    
      this.Factory.removeFromUser({
        itemId: this.itemId,
        userId: user._id
      });
    }
    this.currentUsers = _.reject(this.currentUsers, (currentUser) => {
      return currentUser._id === user._id;
    });
  }

  getCurrentItemData(){

    this.Factory.getById(this.itemId)
    .then(item => {
      this.currentItem = item;
      return this.Factory.getUsersById(this.itemId);
    })
    .then(itemUsers => {
      this.currentUsers = itemUsers;
    });
  }
}

AddItemController.$injector = ['$scope', '$injector', 'User'];

export {AddItemController};
