
import {taskDirective} from './task.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {addItem} from '../../directives/addItem/addItem';
import {addSubItem} from '../../directives/addSubItem/addSubItem';
import {itemList} from '../../directives/itemList/itemList';

export const task = angular.module('task', [
  uiRouter, 
  addItem.name,
  addSubItem.name,
  itemList.name
  ])
.config(($stateProvider) => {
  $stateProvider.state('task', {
    url: '/task/:id',
    template: '<task></task>'
  });
})
.directive('task', taskDirective);

