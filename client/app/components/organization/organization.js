
import {organizationDirective} from './organization.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {addItem} from '../../directives/addItem/addItem';
import {addSubItem} from '../../directives/addSubItem/addSubItem';
import {itemList} from '../../directives/itemList/itemList';
import {collapsible} from '../../directives/collapsible/collapsible';

export const organization = angular.module('organization', [
  uiRouter, 
  addItem.name, 
  addSubItem.name, 
  itemList.name,
  collapsible.name
])
  .config(($stateProvider) => {
    $stateProvider.state('organization', {
      url: '/organization/:id',
      template: '<organization></organization>'
    });
  })
  .directive('organization', organizationDirective);

