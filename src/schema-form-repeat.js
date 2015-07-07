angular.
module('schemaFormRepeat', ['schemaForm']).

config(['schemaFormDecoratorsProvider', 'schemaFormProvider', function(schemaFormDecoratorsProvider, schemaFormProvider){
        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'repeated',
            'repeated.html'
        );
}]).

run(['$templateCache', function($templateCache){
    // Get and modify default templates
    var tmpl = $templateCache.get('directives/decorators/bootstrap/default.html');

    $templateCache.put(
        'repeated.html',
        tmpl.replace('type="{{form.type}}"', 'type="{{form.format}}" password-confirm="{{form.condition}}"').replace(/schemaError/g, 'customError')
    );
}]).

directive('passwordConfirm', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, attr, element, ngModel) {
            var error;
            scope.customError = function(){
                return scope.schemaError() || error;
            };

            scope.$watch(element.passwordConfirm, function(value){
                scope.passwordConfirm = value;
                ngModel.$validate();
            });

            ngModel.$validators.match = function(modelValue, viewValue){
                var value = modelValue || viewValue;
                if(value != scope.passwordConfirm){
                    error = { code: 'match', message: 'No match.' };
                    return false;
                }
                return true;
            };
        }
    };
});
