
import {addSubItemDirective} from './addSubItem.directive';
import angular from 'angular';

export const addSubItem = angular.module('addSubItem', [])
  .directive('addSubItem', addSubItemDirective);

