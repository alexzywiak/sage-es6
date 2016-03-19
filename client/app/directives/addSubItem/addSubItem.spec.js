import {addSubItem} from './addSubItem';
import {AddSubItemController} from './addSubItem.controller';
import {addSubItemDirective} from './addSubItem.directive';
import template from './addSubItem.html';

describe('AddSubItem', ()=>{
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
    window.module(addSubItem.name, ($provide) => {
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

      makeController = (scope, injector)=>{
        return new AddSubItemController(scope, injector);
      }; 
    });
  });

  // Restore mockFactory stubs
  afterEach(() => {
    mockFactory.createNew.restore();
  });

  describe('Controller', ()=>{

    describe('handleSubmit', () => {
      it('should call factory createNew function on handleSubmit when a parent id is present', () => {
        scope.factoryName = 'MockFactory';
        scope.parentId = 'fakestreet';

        let ctrl = makeController(scope, injector);
        
        ctrl.handleSubmit();
        expect(mockFactory.createNew.called).to.equal(true);
      });

      it('should not call factory createNew function on handleSubmit when a parent id is present', () => {
        scope.factoryName = 'MockFactory';
        scope.parentId = undefined;

        let ctrl = makeController(scope, injector);
        
        ctrl.handleSubmit();
        expect(mockFactory.createNew.called).to.equal(false);
      });

      it('should pass the current item to createNew factory function', () => {
        scope.factoryName = 'MockFactory';
        scope.parentId = 'fakestreet';
        let ctrl = makeController(scope, injector);
        
        ctrl.currentItem = {
          name:'fake town',
          description: 'not realsville'
        };

        ctrl.handleSubmit();
        expect(mockFactory.createNew.calledWith(ctrl.currentItem)).to.equal(true);
        expect(ctrl.parentId).to.equal('fakestreet');
      });
    });
  });

  describe('Template', ()=>{
    it('should have addSubItem class on a section tag', () => {
      expect(template).match(/^<section.*class="addSubItem/);
    });

    it('should have button that calls handleSubmit', () => {
      expect(template).match(/<button.*ng-click="vm\.handleSubmit\(\)"/);
    });

    it('should have a transclusion container', () => {
      expect(template).match(/class="item-form-container"/);
    });
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
        `<add-sub-item 
        parent-id="parentId"
        factory-name="MockFactory"      
        >
        <div>
          transcludedContent
        </div>
        </add-sub-item>`
        ))(scope);
      scope.$digest();
      return compiledDirective;
    }

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

    it('should have factory name, parent id, and current item properties', () => {
      const isolateScope = directiveElem.isolateScope();
      expect(isolateScope.factoryName).to.equal('MockFactory');
      expect(isolateScope.parentId).to.equal('parentId');
    });

    it('should have factory name, parent id, and current item properties', () => {
      const isolateScope = directiveElem.isolateScope();
      expect(isolateScope.factoryName).to.equal('MockFactory');
      expect(isolateScope.parentId).to.equal('parentId');
    });

    it('should have transcluded content', () => {
      expect(directiveElem.html()).match(/transcludedContent/);
    });

  });
});
