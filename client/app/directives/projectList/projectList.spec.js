import {projectList} from './projectList';
import {ProjectListController} from './projectList.controller';
import {projectListDirective} from './projectList.directive';
import template from './projectList.html';

describe('ProjectList', ()=>{
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

    //Register the mock factory on the module
    window.module(projectList.name, ($provide) => {
      $provide.value('Project', mockFactory);
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
        scope.projects = [{_id:0, name:'project0'}, {_id:1, name:'project1'}];
        directiveElem = getCompiledElement();
      });

    // Create mocked out directive by creating fake element
    function getCompiledElement(){
      let compiledDirective = compile(angular.element(
        `<project-list 
        projects="projects"    
        >
        </project-list>`
        ))(scope);
        scope.$digest();
        return compiledDirective;
      }

    // test the component/directive itself
    let directive = projectListDirective();

    it('should use the right template',()=>{
      expect(directive.template).to.equal(template);
    });

    it('should use controllerAs', ()=>{
      expect(directive).to.have.property('controllerAs');
    });

    it('should use the right controller', ()=>{
      expect(directive.controller).to.equal(ProjectListController);
    });

    it('should have access to project list on isolate scope', () => {
      let isolateScope = directiveElem.isolateScope();
      expect(isolateScope.projects).to.eql(scope.projects);
    });

    it('should have access to project list on isolate scope', () => {
      let isolateScope = directiveElem.isolateScope();
      expect(isolateScope.projects).to.eql(scope.projects);
    });

    it('should render each project', () => {
      let projects = $(directiveElem).find('.project');
      expect(projects.length).to.equal(2);
    });
  });
});

