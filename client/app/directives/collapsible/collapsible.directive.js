import './collapsible.styl';
import {CollapsibleController as controller} from './collapsible.controller';
import template from './collapsible.html';

export const collapsibleDirective = () => {
  return {
    restrict: 'A',
    scope: {},
    link: (scope, element, attrs) => {

      const collapser = angular.element('<button class="btn collapse-btn"></button>');
      
      // Changes the appearance of the button for show/hide
      scope.toggleButtonDisplay = () => {
        collapser.removeClass('btn-success');
        collapser.removeClass('btn-primary');
        if(scope.show){
          collapser.addClass('btn-primary');
          collapser.text('Hide');
        } else {
          collapser.addClass('btn-success');
          collapser.text('Show');
        }
      };

      // Check if hidden by default
      if(scope.$eval(attrs.showDefault) !== undefined){
        scope.show = !!scope.$eval(attrs.showDefault);
      } else {
        scope.show = true;
      }

      // Hide if necessary
      if(!scope.show){
        element.toggleClass('collapse-siblings');
      }

      // Initialize button display
      scope.toggleButtonDisplay();

      // Bind click handler
      collapser.bind('click', () => {
        scope.show = !scope.show;
        scope.toggleButtonDisplay();
        element.toggleClass('collapse-siblings');
      });

      element.append(collapser);
    }
  };
};