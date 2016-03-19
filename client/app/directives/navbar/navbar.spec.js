import {navbar} from './navbar';
import {NavbarController} from './navbar.controller';
import {navbarDirective} from './navbar.directive';
import template from './navbar.html';

describe('Navbar', ()=>{
  let $rootScope,
  makeController;

  beforeEach(window.module(navbar.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeController = ()=>{
      return new NavbarController();
    };
  }));

  describe('Module', ()=>{
    // test things about the component module
    // checking to see if it registers certain things and what not
    // test for best practices with naming too
    // test for routing
  });

  describe('Controller', ()=>{
   
  });

  describe('Template', ()=>{
   
  });


  describe('Directive', ()=>{
      // // test the component/directive itself
      // let directive = navbarDirective();

      // it('should use the right template',()=>{
      //   expect(directive.template).to.equal(template);
      // });

      // it('should use controllerAs', ()=>{
      //   expect(directive).to.have.property('controllerAs');
      // });

      // it('should use the right controller', ()=>{
      //   expect(directive.controller).to.equal(NavbarController);
      // });
  });
});
