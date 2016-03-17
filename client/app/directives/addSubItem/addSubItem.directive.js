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
    transclude: true
  };
};
