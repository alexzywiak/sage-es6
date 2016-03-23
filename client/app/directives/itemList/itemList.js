
import {itemListDirective} from './itemList.directive';
import angular from 'angular';

import {userList} from '../userList/userList';
import {inject} from '../inject/inject'; 

export const itemList = angular.module('itemList', [userList.name, inject.name])
  .directive('itemList', itemListDirective);

