
class ItemListController {
  constructor($scope, $injector) {
    angular.extend(this, $scope);
    this.$scope = $scope;
    this.Factory = $injector.get(this.factoryName);

    $scope.$watch('items', items => {
      this.items = items;
    });
  }

  onDelete(_id){
    this.Factory.remove(_id)
      .then(() => {
        this.items = this.items.filter(item => {
          return item._id !== _id;
        });
      });
  }
}

ItemListController.$inject = ['$scope', '$injector'];

export {ItemListController};
