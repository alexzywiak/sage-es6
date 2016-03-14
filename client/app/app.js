import 'normalize.css';
import {appDirective} from './app.directive';

// Angular Dependencies
import angular    from 'angular';
import uiRouter   from 'angular-ui-router';

import {services} from './services/services';

// gulp component --name=new-component
import {test} from './components/test/test';

angular.module('app', [
  uiRouter,

  services.name,

  test.name
])
.directive('app', appDirective);