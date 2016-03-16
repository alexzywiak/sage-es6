import './addOrgForm.styl';
import {AddOrgFormController as controller} from './addOrgForm.controller';
import template from './addOrgForm.html';

export const addOrgFormDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      organizationId: '='
    },
    restrict: 'E',
    replace: true
  };
};
