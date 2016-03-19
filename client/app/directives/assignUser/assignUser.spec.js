import {assignUser} from './assignUser';
import {AssignUserController} from './assignUser.controller';
import {assignUserDirective} from './assignUser.directive';
import template from './assignUser.html';

describe('assignUser', ()=>{
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
    window.module(assignUser.name, ($provide) => {
      $provide.value('MockFactory', mockFactory);
    });

    // Inject the dependencies
    inject((_$compile_, $rootScope, $injector, _$q_) => {

      compile=_$compile_;
      injector=$injector;
      scope=$rootScope.$new();
      
      // Mock out $q
      q = _$q_;

      deferred = q.defer();

      // Stub out factoryFunctions
      sinon.stub(mockFactory, 'createNew', () => { return deferred.promise});   
    });

    makeController = (scope, injector)=>{
      return new AssignUserController(scope, injector);
    };
  });

  // Restore mockFactory stubs
  afterEach(() => {
    mockFactory.createNew.restore();
  });

  describe('Controller', ()=>{

    describe('filterAllUserList', () => {
      it('should filter out current users from filteredAllUsers', () => {
        scope.allUsers = [{_id:'user1'}, {_id:'user2'}];
        scope.currentUsers = [{_id:'user1'}];

        let ctrl = makeController(scope, injector);

        ctrl.filterAllUserList();
        
        expect(ctrl.filteredAllUsers).to.eql([{_id:'user2'}]);
        expect(ctrl.allUsers).to.equal(scope.allUsers);
        expect(ctrl.currentUsers).to.equal(scope.currentUsers);
      });
    });

    describe('adding and removing users', () => {
      it('should call onAddUser function with user at passed index', () => {
        scope.allUsers = [{_id:'user1'}, {_id:'user2'}];
        scope.currentUsers = [{_id:'user1'}];
        scope.onAddUser = sinon.spy();

        let ctrl = makeController(scope, injector);
        ctrl.filteredAllUsers = [{_id:'user2'}];
        ctrl.handleAddUser(0);

        expect(ctrl.onAddUser.args[0][0]).to.eql({user:{_id:'user2'}});
      });

      it('should call onRemoveUser function with user at passed index', () => {
        scope.allUsers = [{_id:'user1'}, {_id:'user2'}];
        scope.currentUsers = [{_id:'user1'}];
        scope.onRemoveUser = sinon.spy();

        let ctrl = makeController(scope, injector);
        
        ctrl.handleRemoveUser(0);
        expect(scope.onRemoveUser.args[0][0]).to.eql({user: {_id:'user1'}});
      });
    });
  });

  describe('Template', ()=>{

  });

  describe('Directive', ()=>{
    let ctrl;

    beforeEach(() => {
      scope.allUsers = [{username:'user1'}, {username:'user2'}];
      scope.currentUsers = [{username:'user3'}, {username:'user4'}];
      scope.onAddUser = sinon.spy();
      scope.onRemoveUser = sinon.spy();

      directiveElem = getCompiledElement();
    });

    // Create mocked out directive by creating fake element
    function getCompiledElement(){
      let compiledDirective = compile(angular.element(
        `<assign-user 
        all-users="allUsers"
        current-users="currentUsers"
        on-add-user="onAddUser"
        on-remove-user="onRemoveUser"      
        >
        </assign-user>`
        ))(scope);
        scope.$digest();
        return compiledDirective;
      }

    // test the component/directive itself
    let directive = assignUserDirective();

    it('should use the right template',()=>{
      expect(directive.template).to.equal(template);
    });

    it('should use controllerAs', ()=>{
      expect(directive).to.have.property('controllerAs');
    });

    it('should use the right controller', ()=>{
      expect(directive.controller).to.equal(AssignUserController);
    });

    it('should have correct properties on isolate scope', () => {
      const isolateScope = directiveElem.isolateScope();
      expect(isolateScope.allUsers).to.be.a('array');
      expect(isolateScope.currentUsers).to.be.a('array');
      expect(isolateScope.onAddUser).to.be.a('function');
      expect(isolateScope.onRemoveUser).to.be.a('function');
    });

    it('should render users from currentUsers', () => {
      expect(directiveElem.html()).match(/user3/);
    });
  });
});
