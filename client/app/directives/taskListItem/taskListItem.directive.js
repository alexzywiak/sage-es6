import './taskListItem.styl';
import {TaskListItemController as controller} from './taskListItem.controller';
import template from './taskListItem.html';

export const taskListItemDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
