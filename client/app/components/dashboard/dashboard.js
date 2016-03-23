
import {dashboardDirective} from './dashboard.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {itemList} from '../../directives/itemList/itemList'

export const dashboard = angular.module('dashboard', [uiRouter, itemList.name])
  .config(($stateProvider) => {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    });
  })
  .directive('dashboard', dashboardDirective);

