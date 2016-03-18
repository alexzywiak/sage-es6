import {addSubItem} from './addSubItem';
import {AddSubItemController} from './addSubItem.controller';
import {addSubItemDirective} from './addSubItem.directive';
import template from './addSubItem.html';

describe('AddSubItem', ()=>{
  let $rootScope,
  makeController,
  compile,
  scope,
  onAddUser,
  onRemoveUser,
  directiveElem;

  beforeEach(window.module(addSubItem.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeController = ()=>{
      return new AddSubItemController();
    };
  }));

  // Mock directive scope props
  beforeEach(function() {

    inject(function ($compile, $rootScope) {
      compile=$compile;
      scope=$rootScope.$new();
    });

    directiveElem = getCompiledElement();
  });

  function getCompiledElement(){
    var compiledDirective = compile(angular.element(
      // directive  
    ))(scope);
    scope.$digest();
    return compiledDirective;
  }


  describe('Controller', ()=>{

  });

  describe('Template', ()=>{

  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = addSubItemDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(AddSubItemController);
      });
  });
});
