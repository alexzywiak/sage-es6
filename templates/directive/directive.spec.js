import {<%= name %>} from './<%= name %>';
import {<%= upCaseName %>Controller} from './<%= name %>.controller';
import {<%= name %>Directive} from './<%= name %>.directive';
import template from './<%= name %>.html';

describe('<%= upCaseName %>', ()=>{
  let $rootScope,
  makeController,
  compile,
  scope,
  onAddUser,
  onRemoveUser,
  directiveElem;

  beforeEach(window.module(<%= name %>.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeController = ()=>{
      return new <%= upCaseName %>Controller();
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
    // test your controller here

    it('should have a name property [REMOVE]', ()=>{ // erase me if you remove this.name from the controller
      let controller = makeController();

      expect(controller).to.have.property('greeting');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have name in template [REMOVE]', ()=>{
      expect(template).to.match(/{{\s?vm\.greeting\s?}}/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = <%= name %>Directive();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(<%= upCaseName %>Controller);
      });
  });
});
