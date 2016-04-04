import 'normalize.css';

import {appDirective} from './app.directive';

// Angular Dependencies
import angular    from 'angular';
import uiRouter   from 'angular-ui-router';

// JWT Dependencies
import angularJwt     from 'angular-jwt';
import angularStorage from 'angular-storage';

import {services} from './services/services';

// gulp component --name=new-component
import {navbar} from './directives/navBar/navBar';
import {dashboard} from './components/dashboard/dashboard';
import {organization} from './components/organization/organization';
import {project} from './components/project/project';
import {task} from './components/task/task';

angular.module('app', [
  uiRouter,

  angularJwt,
  angularStorage,

  services.name,

  navbar.name,
  dashboard.name,
  organization.name,
  project.name,
  task.name
])
.directive('app', appDirective)
.config(['$urlRouterProvider', function($urlRouterProvider){
  $urlRouterProvider.otherwise('/dashboard');
}]);