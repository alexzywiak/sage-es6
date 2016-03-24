
import {projectDirective} from './project.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {addItem} from '../../directives/addItem/addItem';
import {addSubItem} from '../../directives/addSubItem/addSubItem';
import {itemList} from '../../directives/itemList/itemList';

export const project = angular.module('project', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('project', {
      url: '/project/:id',
      template: '<project></project>'
    });
  })
  .directive('project', projectDirective);

