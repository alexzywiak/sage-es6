
import {addItemDirective} from './addItem.directive';
import angular from 'angular';

import {assignUser} from '../assignUser/assignUser';

export const addItem = angular.module('addItem', [assignUser.name])
  .directive('addItem', addItemDirective);

