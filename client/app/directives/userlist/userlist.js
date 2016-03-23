
import {userListDirective} from './userList.directive';
import angular from 'angular';

export const userList = angular.module('userList', [])
  .directive('userList', userListDirective);

