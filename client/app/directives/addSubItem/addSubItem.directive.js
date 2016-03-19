import './addSubItem.styl';
import {AddSubItemController as controller} from './addSubItem.controller';
import template from './addSubItem.html';

export const addSubItemDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      parentId: '=',
      factoryName: '='
    },
    restrict: 'E',
    replace: true,
    transclude: true,
    link: (scope, element, attrs, ctrl, transclude) => {
      transclude(scope, (clone, scope) => {
        angular.element(element[0].querySelector('.item-form-container')).prepend(clone);
      });
    }
  };
};
