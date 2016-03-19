import {addItem} from './addItem';
import {AddItemController} from './addItem.controller';
import {addItemDirective} from './addItem.directive';
import template from './addItem.html';

describe('AddItem', ()=> {
  let $rootScope,
  makeController,
  compile,
  injector,
  scope,
  q,
  deferred,
  deferredB,
  directiveElem,
  mockFactory,
  mockUserFactory;

  beforeEach(function(){

    mockFactory = {
      getById: () => {},
      getUsersById: () => {},
      update: () => {},
      createNew: () => {},
      addToUser: () => {},
      removeFromUser: () => {}
    };

    mockUserFactory = {
      getAll: () => {}
    };

    // Register the mock factory on the module
    window.module(addItem.name, ($provide) => {
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


      // Stub out mockFactory functions
      sinon.stub(mockFactory, 'getById',        () => { return deferred.promise });
      sinon.stub(mockFactory, 'getUsersById',   () => { return deferred.promise });
      sinon.stub(mockFactory, 'update',         () => { return deferred.promise });
      sinon.stub(mockFactory, 'createNew',      () => { return deferred.promise });
      sinon.stub(mockFactory, 'addToUser');
      sinon.stub(mockFactory, 'removeFromUser');

      // Stub out mockUserFactory functions
      sinon.stub(mockUserFactory, 'getAll', () => { return deferred.promise });

      makeController = (scope, injector, user)=>{
        return new AddItemController(scope, injector, user);
      }; 
    });
  });

  // Restore mockFactory stubs
  afterEach(() => {
    mockUserFactory.getAll.restore();
  });


  describe('Controller', ()=>{
    describe('init function', () => {

      it('should get all users and set to allUsers prop', () => {
        const mockUserData = [{_id: 'user1'}, {_id: 'user2'}];
        scope.factoryName = 'MockFactory';

        let ctrl = makeController(scope, injector, mockUserFactory);
        
        // Resolve promises with mock data
        deferred.resolve(mockUserData);
        
        // Apply Changes
        scope.$apply();

        expect(mockUserFactory.getAll.called).to.equal(true);
        expect(ctrl.allUsers).to.eql([{_id: 'user1'}, {_id: 'user2'}]);
      });

      it('should not get current item data if itemId is not defined', () => {
        scope.factoryName = 'MockFactory';

        let ctrl = makeController(scope, injector, mockUserFactory);
        
        expect(mockFactory.getById.called).to.equal(false);
      });

      it('should call get current item data if item id is defined', () => {
        const mockItemData = {name:'get mocked'};
        scope.factoryName = 'MockFactory';
        scope.itemId = 'fakeStreet';

        let ctrl = makeController(scope, injector, mockUserFactory);
        
        deferred.resolve(mockItemData);
        scope.$apply();

        expect(mockFactory.getById.called).to.equal(true);
        expect(mockFactory.getById.calledWith('fakeStreet')).to.equal(true);
        expect(ctrl.currentItem).to.eql(mockItemData);
      });

      it('should call get current item data if item id is defined', () => {
        const mockItemData = {name:'get mocked'};
        scope.factoryName = 'MockFactory';
        scope.itemId = 'fakeStreet';

        let ctrl = makeController(scope, injector, mockUserFactory);
        
        deferred.resolve(mockItemData);
        scope.$apply();

        expect(mockFactory.getUsersById.called).to.equal(true);
        expect(mockFactory.getUsersById.calledWith('fakeStreet')).to.equal(true);
        expect(ctrl.currentUsers).to.eql(mockItemData);
      });
    });

    describe('Controller Methods', () => {

      let ctrl;

      beforeEach(() => {
        scope.factoryName = 'MockFactory';
        ctrl = makeController(scope, injector, mockUserFactory);
      });

      describe('handleSubmit', () => {

        it('should call createNewItem if item id is not defined', () => {
          sinon.stub(ctrl, 'createNewItem');
          sinon.stub(ctrl, 'updateItem');
          ctrl.handleSubmit();

          expect(ctrl.createNewItem.called).to.be.true;
          expect(ctrl.updateItem.called).to.be.false;

          ctrl.createNewItem.restore();
          ctrl.updateItem.restore();
        });

        it('should call updateItem if item id is defined', () => {
          ctrl.itemId = 'fakeStreet';

          sinon.stub(ctrl, 'createNewItem');
          sinon.stub(ctrl, 'updateItem');
          ctrl.handleSubmit();

          expect(ctrl.updateItem.called).to.be.true;
          expect(ctrl.createNewItem.called).to.be.false;

          ctrl.createNewItem.restore();
          ctrl.updateItem.restore();
        });
      });

      describe('updateItem', () => {

        it('should call factory update function with current item data', () => {
          ctrl.currentItem = 'some phat ass shit';
          ctrl.updateItem();

          expect(mockFactory.update.called).to.be.true;
          expect(mockFactory.update.calledWith('some phat ass shit')).to.be.true;
        });
      });

      describe('createNewItem', () => {

        it('should pass current item data to the createNew Factory function', () => {
          ctrl.currentItem = 'current';

          ctrl.createNewItem();

          expect(mockFactory.createNew.called).to.be.true;
          expect(mockFactory.createNew.calledWith('current')).to.be.true;
        });

        it('should set itemId and currentItem properties on response', () => {
          const mockResponse = {_id: 'id'};

          ctrl.createNewItem();

          deferred.resolve(mockResponse);
          scope.$apply();

          expect(ctrl.itemId).to.equal('id');
        });

        it('should call add each currentUser when createNewItem is called', () => {
          const mockResponse = {_id: 'id'};

          ctrl.currentUsers = [{_id:1}, {_id:2}];

          ctrl.createNewItem();

          deferred.resolve(mockResponse);
          scope.$apply();

          expect(mockFactory.addToUser.callCount).to.equal(2);
          expect(mockFactory.addToUser.getCall(0).args[0]).to.eql({userId:1, itemId: 'id'});
          expect(mockFactory.addToUser.getCall(1).args[0]).to.eql({userId:2, itemId: 'id'});
        });
      });

      describe('onAddUser', () => {
        const mockUser = {_id: 1};
        
        it('should push user to array if no item id is present', () => {
          ctrl.onAddUser(mockUser);
          expect(mockFactory.addToUser.called).to.be.false;
          expect(ctrl.currentUsers).to.include(mockUser);
        });

        it('should call addToUser factory function if item id exists', () => {
          ctrl.itemId = 'fakeId'
          ctrl.onAddUser(mockUser);
          expect(mockFactory.addToUser.called).to.be.true;
          expect(mockFactory.addToUser.getCall(0).args[0]).to.eql({userId: 1, itemId: 'fakeId'});
          expect(ctrl.currentUsers).to.include(mockUser);
        });
      });

      describe('removeFromUser', () => {
        const mockUser = {_id: 1};

        it('should splice user from array if no item id is present', () => {
          ctrl.currentUsers.push(mockUser);
          ctrl.onRemoveUser(mockUser);
          expect(mockFactory.removeFromUser.called).to.be.false;
          expect(ctrl.currentUsers.length).to.equal(0);
        });

        it('should call addToUser factory function if item id exists', () => {
          ctrl.itemId = 'fakeId';
          ctrl.currentUsers.push(mockUser);
          ctrl.onRemoveUser(mockUser);
          expect(mockFactory.removeFromUser.called).to.be.true;
          expect(mockFactory.removeFromUser.getCall(0).args[0]).to.eql({userId: 1, itemId: 'fakeId'});
          expect(ctrl.currentUsers.length).to.equal(0);
        });
      });
    }); 
  });

describe('Template', ()=>{

});


describe('Directive', ()=>{
      // test the component/directive itself
      let directive = addItemDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(AddItemController);
      });
    });
});
