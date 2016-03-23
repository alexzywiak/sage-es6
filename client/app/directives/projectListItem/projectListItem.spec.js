import {projectListItem} from './projectListItem';
import {ProjectListItemController} from './projectListItem.controller';
import {projectListItemDirective} from './projectListItem.directive';
import template from './projectListItem.html';

describe('ProjectListItem', ()=>{
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
    window.module(projectListItem.name, ($provide) => {
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
        scope.project = {_id: 0, 'name': 'project0', description: 'description'};
        directiveElem = getCompiledElement();
      });

    // Create mocked out directive by creating fake element
    function getCompiledElement(){
      let compiledDirective = compile(angular.element(
        `<project-list-item 
        project="project"
        >
        </project-list-item>`
        ))(scope);
        scope.$digest();
        return compiledDirective;
      }

    // test the component/directive itself
    let directive = projectListItemDirective();

    it('should use the right template',()=>{
      expect(directive.template).to.equal(template);
    });

    it('should have access to project on isolate scope', () => {
      let isolateScope = directiveElem.isolateScope();
      expect(isolateScope.project).to.eql(scope.project);
    });

    it('should render the project name', () => {
      expect(directiveElem.html()).to.match(/project0/);
    });

    it('should render the project description', () => {
      expect(directiveElem.html()).to.match(/description/);
    });

    it('should have an edit button linking to that project', () => {
      let btns = $(directiveElem).find('.edit-btn');
      expect(btns.length).to.equal(1);
      expect($(btns[0]).attr('ui-sref')).to.equal('/project/0');
    });

    it('should have a delete button that calls the handle delete function', () => {
      let directiveScope = directiveElem.isolateScope();
      sinon.spy(directiveScope, 'handleDelete');
      console.log(typeof directiveScope.handleDelete);
      let btns = $(directiveElem).find('.delete-btn');
      expect(btns.length).to.equal(1);
      $(btns[0]).trigger('click');
      expect(directiveScope.handleDelete.called).to.be.true;
      directiveScope.handleDelete.restore();
    });      
  });
});

