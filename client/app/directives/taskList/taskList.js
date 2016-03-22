
import {taskListDirective} from './taskList.directive';
import angular from 'angular';

export const taskList = angular.module('taskList', [])
  .directive('taskList', taskListDirective);

