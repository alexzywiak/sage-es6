import './test.styl';
import {TestController as controller} from './test.controller';
import template from './test.html';

export const testDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
