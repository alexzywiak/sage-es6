
import {navbarDirective} from './navbar.directive';
import angular from 'angular';

export const navbar = angular.module('navbar', [])
  .directive('navbar', navbarDirective);

