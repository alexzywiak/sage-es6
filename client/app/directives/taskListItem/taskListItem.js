
import {taskListItemDirective} from './taskListItem.directive';
import angular from 'angular';

export const taskListItem = angular.module('taskListItem', [])
  .directive('taskListItem', taskListItemDirective);

