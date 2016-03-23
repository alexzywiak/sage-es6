import './projectList.styl';
import {ProjectListController as controller} from './projectList.controller';
import template from './projectList.html';

export const projectListDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      projects: '='
    },
    restrict: 'E',
    replace: true
  };
};
