import './task.styl';
import {TaskController as controller} from './task.controller';
import template from './task.html';

export const taskDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
