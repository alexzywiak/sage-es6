import './organizationList.styl';
import {OrganizationListController as controller} from './organizationList.controller';
import template from './organizationList.html';

export const organizationListDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
