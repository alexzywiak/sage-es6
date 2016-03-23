import './projectListItem.styl';
import {ProjectListItemController as controller} from './projectListItem.controller';
import template from './projectListItem.html';

export const projectListItemDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      project: '=',
      onDelete: '&'
    },
    restrict: 'E',
    replace: true
  };
};
