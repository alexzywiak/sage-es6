
class AddSubItemController {
  constructor($scope, $injector) {
    angular.extend(this, $scope);
    this.Factory = $injector.get(this.factoryName);

    this.currentItem = {};

    $scope.$watch('itemList', itemList => {
      this.itemList = itemList;
    });

    $scope.$watch('parentId', (parentId) => {
      this.parentId = parentId;
      this.currentItem.parentId = this.parentId;
    });
  }

  handleSubmit(){
    if(this.parentId){
      return this.Factory.createNew(this.currentItem)
        .then(resp => this.itemList.push(resp));
    }
  }

}

AddSubItemController.$inject = ['$scope', '$injector'];

export {AddSubItemController};
