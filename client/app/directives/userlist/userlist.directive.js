import './userlist.styl';
import {UserlistController as controller} from './userlist.controller';
import template from './userlist.html';

export const userlistDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      itemId: '='
    },
    restrict: 'E',
    replace: true
  };
};
