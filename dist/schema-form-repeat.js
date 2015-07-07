/**
 * angular-schema-form-repeat - Manage an input with repeat attribute
 * @version v0.1.0
 * @link https://github.com/Webfutur/angular-schema-form-repeat
 * @license GPL-2.0
 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2hlbWEtZm9ybS1yZXBlYXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5cbm1vZHVsZSgnc2NoZW1hRm9ybVJlcGVhdCcsIFsnc2NoZW1hRm9ybSddKS5cblxuY29uZmlnKFsnc2NoZW1hRm9ybURlY29yYXRvcnNQcm92aWRlcicsICdzY2hlbWFGb3JtUHJvdmlkZXInLCBmdW5jdGlvbihzY2hlbWFGb3JtRGVjb3JhdG9yc1Byb3ZpZGVyLCBzY2hlbWFGb3JtUHJvdmlkZXIpe1xuICAgICAgICBzY2hlbWFGb3JtRGVjb3JhdG9yc1Byb3ZpZGVyLmFkZE1hcHBpbmcoXG4gICAgICAgICAgICAnYm9vdHN0cmFwRGVjb3JhdG9yJyxcbiAgICAgICAgICAgICdyZXBlYXRlZCcsXG4gICAgICAgICAgICAncmVwZWF0ZWQuaHRtbCdcbiAgICAgICAgKTtcbn1dKS5cblxucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgLy8gR2V0IGFuZCBtb2RpZnkgZGVmYXVsdCB0ZW1wbGF0ZXNcbiAgICB2YXIgdG1wbCA9ICR0ZW1wbGF0ZUNhY2hlLmdldCgnZGlyZWN0aXZlcy9kZWNvcmF0b3JzL2Jvb3RzdHJhcC9kZWZhdWx0Lmh0bWwnKTtcblxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dChcbiAgICAgICAgJ3JlcGVhdGVkLmh0bWwnLFxuICAgICAgICB0bXBsLnJlcGxhY2UoJ3R5cGU9XCJ7e2Zvcm0udHlwZX19XCInLCAndHlwZT1cInt7Zm9ybS5mb3JtYXR9fVwiIHBhc3N3b3JkLWNvbmZpcm09XCJ7e2Zvcm0uY29uZGl0aW9ufX1cIicpLnJlcGxhY2UoL3NjaGVtYUVycm9yL2csICdjdXN0b21FcnJvcicpXG4gICAgKTtcbn1dKS5cblxuZGlyZWN0aXZlKCdwYXNzd29yZENvbmZpcm0nLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGF0dHIsIGVsZW1lbnQsIG5nTW9kZWwpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgICAgIHNjb3BlLmN1c3RvbUVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuc2NoZW1hRXJyb3IoKSB8fCBlcnJvcjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChlbGVtZW50LnBhc3N3b3JkQ29uZmlybSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIHNjb3BlLnBhc3N3b3JkQ29uZmlybSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbmdNb2RlbC4kdmFsaWRhdG9ycy5tYXRjaCA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSl7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbW9kZWxWYWx1ZSB8fCB2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgIT0gc2NvcGUucGFzc3dvcmRDb25maXJtKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSB7IGNvZGU6ICdtYXRjaCcsIG1lc3NhZ2U6ICdObyBtYXRjaC4nIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sImZpbGUiOiJzY2hlbWEtZm9ybS1yZXBlYXQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==