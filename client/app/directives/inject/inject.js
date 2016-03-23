const injectDirective = () => {
  return {
    link: (scope, element, attrs, ctrl, transclude) => {
      
      if(!transclude){
        console.error('Parent does not require transclusion');
      }

      let innerScope = scope.$new();

      transclude(innerScope, (clone) => {
        element.prepend(clone);
        element.on('$destroy', () => {
          innerScope.$destroy();
        });
      });
    }
  }
};

export const inject = angular.module('inject', [])
.directive('inject', injectDirective);

