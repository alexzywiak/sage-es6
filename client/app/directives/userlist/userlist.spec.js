import {userlist} from './userlist';
import {UserlistController} from './userlist.controller';
import {userlistDirective} from './userlist.directive';
import template from './userlist.html';

describe('Userlist', ()=>{
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
    // window.module(userlist.name, ($provide) => {
    //   $provide.value('MockFactory', mockFactory);
    // });

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

  describe('Controller', ()=>{

    beforeEach(inject((_$rootScope_)=>{
      $rootScope = _$rootScope_;
      makeController = (scope, injector)=>{
        return new AddSubItemController(scope, injector);
      };
    }));
  });

  describe('Template', ()=>{
    // it('should have name in template [REMOVE]', ()=>{
    //   expect(template).to.match(/{{\s?vm\.greeting\s?}}/g);
    // });
  });


  describe('Directive', ()=>{

    beforeEach(() => {
      scope.parentId = 'parentId';
      scope.MockFactory = 'MockFactory';
      directiveElem = getCompiledElement();
    });

    // Create mocked out directive by creating fake element
    function getCompiledElement(){
      let compiledDirective = compile(angular.element(
        `<userlist> 
        parent-id="parentId"
        factory-name="MockFactory"      
        >
        <div>
        transcludedContent
        </div>
        </userlist>`
        ))(scope);
        scope.$digest();
        return compiledDirective;
      }

    // test the component/directive itself
    let directive = userlistDirective();

    it('should use controllerAs', ()=>{
      expect(directive).to.have.property('controllerAs');
    });

    it('should use the right controller', ()=>{
      expect(directive.controller).to.equal(UserlistController);
    });
  });
});

