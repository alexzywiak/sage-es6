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
import {test} from './components/test/test';
import {dashboard} from './components/dashboard/dashboard';

angular.module('app', [
  uiRouter,

  angularJwt,
  angularStorage,

  services.name,

  navbar.name,
  test.name,
  dashboard.name
])
.directive('app', appDirective);