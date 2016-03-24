
import {taskDirective} from './task.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

export const task = angular.module('task', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('task', {
      url: '/task/:id',
      template: '<task></task>'
    });
  })
  .directive('task', taskDirective);

