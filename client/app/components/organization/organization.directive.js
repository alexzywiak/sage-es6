import './organization.styl';
import {OrganizationController as controller} from './organization.controller';
import template from './organization.html';

export const organizationDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
