
import {projectListDirective} from './projectList.directive';
import angular from 'angular';

export const projectList = angular.module('projectList', [])
  .directive('projectList', projectListDirective);

