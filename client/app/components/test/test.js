
import {testDirective} from './test.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

//import {addItem} from '../../directives/addItem/addItem';
import {projectList} from '../../directives/projectList/projectList';
import {projectListItem} from '../../directives/projectListItem/projectListItem';

export const test = angular.module('test', [uiRouter, projectList.name])
  .config(($stateProvider) => {
    $stateProvider.state('test', {
      url: '/test',
      template: '<test></test>'
    });
  })
  .directive('test', testDirective);

