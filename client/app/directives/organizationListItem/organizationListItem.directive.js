import './organizationListItem.styl';
import {OrganizationListItemController as controller} from './organizationListItem.controller';
import template from './organizationListItem.html';

export const organizationListItemDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
