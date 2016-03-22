
import {projectListItemDirective} from './projectListItem.directive';
import angular from 'angular';

export const projectListItem = angular.module('projectListItem', [])
  .directive('projectListItem', projectListItemDirective);

