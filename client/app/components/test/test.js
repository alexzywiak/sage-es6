
import {testDirective} from './test.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {addItem} from '../../directives/addItem/addItem';

export const test = angular.module('test', [uiRouter, addItem.name])
  .config(($stateProvider) => {
    $stateProvider.state('test', {
      url: '/test',
      template: '<test></test>'
    });
  })
  .directive('test', testDirective);

