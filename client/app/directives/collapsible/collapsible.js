
import {collapsibleDirective} from './collapsible.directive';
import angular from 'angular';

export const collapsible = angular.module('collapsible', [])
  .directive('collapsible', collapsibleDirective);

