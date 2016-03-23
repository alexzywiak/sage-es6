
import {projectListDirective} from './projectList.directive';
import angular from 'angular';

import {projectListItem} from '../projectListItem/projectListItem';

export const projectList = angular.module('projectList', [projectListItem.name])
  .directive('projectList', projectListDirective);

