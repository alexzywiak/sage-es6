
import {testDirective} from './test.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

//import {addItem} from '../../directives/addItem/addItem';
import {itemList} from '../../directives/itemList/itemList';

export const test = angular.module('test', [uiRouter, itemList.name])
  .config(($stateProvider) => {
    $stateProvider.state('test', {
      url: '/test',
      template: '<test></test>'
    });
  })
  .directive('test', testDirective);

