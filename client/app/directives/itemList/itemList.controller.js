
class ItemListController {
  constructor($scope, $injector) {
    angular.extend(this, $scope);

    this.Factory = $injector.get(this.factoryName);
    console.log(this.factoryName);

    $scope.$watch('items', items => {
      this.items = items;
      console.log(this.items);
    });
  }

  onDelete(_id){
    console.log(_id);
    this.items = this.items.filter(item => {
      return project._id !== _id;
    });
    // this.Project.remove(_id)
    //   .then(() => {
    //     this.items = this.items.filter(project => {
    //       return project._id !== _id;
    //     });
    //   });
  }
}

ItemListController.$inject = ['$scope', '$injector'];

export {ItemListController};
