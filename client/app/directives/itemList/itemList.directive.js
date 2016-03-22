import './itemList.styl';
import {ItemListController as controller} from './itemList.controller';
import template from './itemList.html';

export const itemListDirective = () => {
  return {
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    scope: {
      itemList: '=',
      factoryName: '='
    },
    compile: (tElem, tAttrs, tTransclude) => {
      // Get existing elements in the directive html (transcluded stuff)
      let children = tElem.children();
      // Get template file
      tElem.html(template);
      // Append transcluded stuff to transclusion point inside our template html
      angular.element(tElem[0].querySelector('.transclude')).append(children);

      return {
        pre: (scope, iElem, iAttrs, ctrl, transclude) => {
        },
        post: (scope, iElem, iAttrs, ctrl, transclude) => {
        }
      } 
    }
  };
};