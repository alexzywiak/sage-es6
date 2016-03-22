
import {itemListDirective} from './itemList.directive';
import angular from 'angular';

export const itemList = angular.module('itemList', [])
  .directive('itemList', itemListDirective);

