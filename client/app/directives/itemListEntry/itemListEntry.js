
import {itemListEntryDirective} from './itemListEntry.directive';
import angular from 'angular';

export const itemListEntry = angular.module('itemListEntry', [])
  .directive('itemListEntry', itemListEntryDirective);

