
class ItemListController {
  constructor($scope, $injector) {
    angular.extend(this, $scope);
    this.$scope = $scope;
    this.Factory = $injector.get(this.factoryName);

    $scope.$watch('items', items => {
      this.items = items;
    });
  }

  onDelete(id){
    this.Factory.remove(id)
      .then(() => {
        this.items = this.items.filter(item => {
          return item._id !== id;
        });
      });
  }
}

ItemListController.$inject = ['$scope', '$injector'];

export {ItemListController};
