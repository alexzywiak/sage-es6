import './project.styl';
import {ProjectController as controller} from './project.controller';
import template from './project.html';

export const projectDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
