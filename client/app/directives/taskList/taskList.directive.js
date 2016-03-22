import './taskList.styl';
import {TaskListController as controller} from './taskList.controller';
import template from './taskList.html';

export const taskListDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
