
import {itemListDirective} from './itemList.directive';
import angular from 'angular';

import {itemListEntry} from '../itemListEntry/itemListEntry'; 

export const itemList = angular.module('itemList', [itemListEntry.name])
  .directive('itemList', itemListDirective);

