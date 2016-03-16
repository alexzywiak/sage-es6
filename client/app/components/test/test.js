
import {testDirective} from './test.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {addOrgForm} from '../../directives/addOrgForm/addOrgForm';

export const test = angular.module('test', [uiRouter, addOrgForm.name])
  .config(($stateProvider) => {
    $stateProvider.state('test', {
      url: '/test',
      template: '<test></test>'
    });
  })
  .directive('test', testDirective);

