import {organization} from './organization';
import {OrganizationController} from './organization.controller';
import {organizationDirective} from './organization.directive';
import template from './organization.html';

describe('Organization', ()=>{
  let $rootScope,
  makeController,
  compile,
  injector,
  scope,
  q,
  deferred,
  directiveElem,
  mockFactory;

  beforeEach(function(){

    mockFactory = {
      createNew: () => {},
      getAll: () => {}
    };

    // Register the mock factory on the module
    window.module(organization.name, ($provide) => {
      $provide.value('MockFactory', mockFactory);
    });

    // Inject the dependencies
    inject(($compile, $rootScope, $injector, _$q_) => {

      compile=$compile;
      injector=$injector;
      scope=$rootScope.$new();
      
      // Mock out $q
      q = _$q_;

      deferred = q.defer();

      // Stub out factoryFunctions
      sinon.stub(mockFactory, 'createNew', () => { return deferred.promise});   
    });
  });

  // Restore mockFactory stubs
  afterEach(() => {
    mockFactory.createNew.restore();
  });

  describe('Module', ()=>{

  });

  describe('Controller', ()=>{
    beforeEach(inject((_$rootScope_)=>{
      $rootScope = _$rootScope_;
      makeController = (scope, injector)=>{
        return new AddSubItemController(scope, injector);
      };
    }));
  });

  describe('Template', ()=>{

  });


  describe('Directive', ()=>{
    describe('Directive', ()=>{

      beforeEach(() => {
        scope.parentId = 'parentId';
        scope.MockFactory = 'MockFactory';
        directiveElem = getCompiledElement();
      });

    // Create mocked out directive by creating fake element
    function getCompiledElement(){
      let compiledDirective = compile(angular.element(
        `<organization 
        parent-id="parentId"
        factory-name="MockFactory"      
        >
        <div>
        transcludedContent
        </div>
        </organization>`
        ))(scope);
        scope.$digest();
        return compiledDirective;
    }

    let directive = organizationDirective();

    it('should use the right template',()=>{
      expect(directive.template).to.equal(template);
    });

    it('should use controllerAs', ()=>{
      expect(directive).to.have.property('controllerAs');
    });

    it('should use the right controller', ()=>{
      expect(directive.controller).to.equal(OrganizationController);
    });
  });
});


