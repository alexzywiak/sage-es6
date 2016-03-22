
import {organizationListDirective} from './organizationList.directive';
import angular from 'angular';

export const organizationList = angular.module('organizationList', [])
  .directive('organizationList', organizationListDirective);

