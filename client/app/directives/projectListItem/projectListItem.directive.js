import './projectListItem.styl';
import {ProjectListItemController as controller} from './projectListItem.controller';
import template from './projectListItem.html';

export const projectListItemDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      item: '=',
      factoryName: '='
    },
    restrict: 'E',
    replace: true,
    transclude: true,
    link: (scope, element, attrs, ctrl, transclude) => {
      transclude(scope, (clone, scope) => {
        angular.element(element[0].querySelector('.transclude')).append(clone);
      });
    }
  };
};
