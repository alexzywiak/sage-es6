
import {assignUserDirective} from './assignUser.directive';
import angular from 'angular';

export const assignUser = angular.module('assignUser', [])
  .directive('assignUser', assignUserDirective);

