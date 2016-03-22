
import {organizationListItemDirective} from './organizationListItem.directive';
import angular from 'angular';

export const organizationListItem = angular.module('organizationListItem', [])
  .directive('organizationListItem', organizationListItemDirective);

