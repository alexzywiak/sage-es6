import './assignUser.styl';
import {AssignUserController as controller} from './assignUser.controller';
import template from './assignUser.html';

export const assignUserDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      currentUsers: '=',
      allUsers: '=',
      onAddUser: '&',
      onRemoveUser: '&'
    },
    restrict: 'E',
    replace: true
  };
};
