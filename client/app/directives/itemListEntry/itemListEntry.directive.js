import './itemListEntry.styl';
import {ItemListEntryController as controller} from './itemListEntry.controller';
import template from './itemListEntry.html';

export const itemListEntryDirective = () => {
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
