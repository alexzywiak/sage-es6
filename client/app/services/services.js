import angular from 'angular';

import {users} from './users';
import {auth} from  './auth';
import {projects} from  './projects';
import {organization} from  './organization';
import {api} from './api';

export const services = angular.module('services', [])
.factory('User', users)
.factory('Project', projects)
.factory('Organization', organization)
.factory('Auth', auth)
.constant('API', api);