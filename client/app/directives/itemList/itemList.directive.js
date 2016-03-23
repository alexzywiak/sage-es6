import './itemList.styl';
import {ItemListController as controller} from './itemList.controller';
import template from './itemList.html';

export const itemListDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      items: '=',
      factoryName: '@',
      route: '@'
    },
    restrict: 'E',
    transclude: true
  };
};
