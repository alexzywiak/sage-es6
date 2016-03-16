import './addItem.styl';
import {AddItemController as controller} from './addItem.controller';
import template from './addItem.html';

export const addItemDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      itemId: '=',
      factoryName: '@'
    },
    restrict: 'E',
    replace: true,
    transclude: true,
    link: (scope, element, attrs, ctrl, transclude) => {
      transclude(scope, (clone, scope) => {
        element.prepend(clone);
      });
    }
  };
};
