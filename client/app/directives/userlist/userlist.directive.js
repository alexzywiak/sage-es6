import './userList.styl';
import {UserListController as controller} from './userList.controller';
import template from './userList.html';

export const userListDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      item: '=',
      factoryName: '='
    },
    restrict: 'E',
    replace: true,
  };
};
