
import {addOrgFormDirective} from './addOrgForm.directive';
import angular from 'angular';

import {assignUser} from '../assignUser/assignUser'

export const addOrgForm = angular.module('addOrgForm', [assignUser.name])
  .directive('addOrgForm', addOrgFormDirective);

