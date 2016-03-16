import {assignUser} from './assignUser';
import {AssignUserController} from './assignUser.controller';
import {assignUserDirective} from './assignUser.directive';
import template from './assignUser.html';

describe('AssignUser', ()=>{
  let $rootScope,
  makeController,
  compile,
  scope,
  onAddUser,
  onRemoveUser,
  directiveElem;

  beforeEach(window.module('assignUser'));

  // Set up Controller
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeController = ()=>{
      return new AssignUserController();
    };
  }));

  // Mock directive scope props
  beforeEach(function() {

    inject(function ($compile, $rootScope) {
      compile=$compile;
      scope=$rootScope.$new();

      onAddUser = sinon.spy();
      onRemoveUser = sinon.spy();

      scope.currentUsers = ['user1', 'user2'];
      scope.allUsers = ['user3', 'user4'];
      scope.onAddUser = onAddUser;
      scope.onRemoveUser = onRemoveUser;
    });

    directiveElem = getCompiledElement();
  });

  function getCompiledElement(){
    let compiledDirective = compile(angular.element(
      `<assign-user 
      current-users="currentUsers" 
      all-users="allUsers" 
      on-add-user="onAddUser()"
      on-remove-user="onRemoveUser()">
      </assign-user>`))(scope);
      scope.$apply();
      return compiledDirective;
    }

  // test the component/directive itself
  let directive = assignUserDirective();

  // it('should use the right template',()=>{
  //   expect(directive.template).to.equal(template);
  // });

  // it('should use controllerAs', ()=>{
  //   expect(directive).to.have.property('controllerAs');
  // });

  // it('should use the right controller', ()=>{
  //   expect(directive.controller).to.equal(AssignUserController);
  // });

  describe('Properties', () => {

    // it('should have a list of all users', () => {
    //   const isolatedScope = directiveElem.isolateScope();
    //   expect(isolatedScope.allUsers).to.be.a('array')
    // }); 

    // it('should have a list of current users', () => {
    //   const isolatedScope = directiveElem.isolateScope();
    //   expect(isolatedScope.currentUsers).to.be.a('array')
    // }); 

    // it('should have an onAddUser Callback', () => {
    //   const isolatedScope = directiveElem.isolateScope();
    //   expect(isolatedScope.onAddUser).to.be.a('function');
    //   isolatedScope.onAddUser();
    //   expect(onAddUser.calledOnce);
    // }); 

    // it('should have an onRemoveUser Callback', () => {
    //   const isolatedScope = directiveElem.isolateScope();
    //   expect(isolatedScope.onRemoveUser).to.be.a('function');
    //   isolatedScope.onRemoveUser();
    //   expect(onRemoveUser.calledOnce);
    // }); 

    it('should no be a piece of shit', () => {
      let el = directiveElem.find('li');
      el.triggerHandler('click');
      expect()
    });
  });

});
