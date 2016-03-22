
import {userlistDirective} from './userlist.directive';
import angular from 'angular';

export const userlist = angular.module('userlist', [])
  .directive('userlist', userlistDirective);

