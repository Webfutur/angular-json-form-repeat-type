angular.module('ngSchemaFormRepeatType', ['schemaForm'])

.config(['schemaFormDecoratorsProvider', 'schemaFormProvider', function(schemaFormDecoratorsProvider, schemaFormProvider){
	schemaFormDecoratorsProvider.addMapping(
		'bootstrapDecorator',
		'password_confirm',
		'password-confirm.html'
	);
   
}])
.run(['$templateCache', function($templateCache){
	// Get and modify default templates
	var tmpl = $templateCache.get('directives/decorators/bootstrap/default.html');

	$templateCache.put(
		'password-confirm.html',
		tmpl.replace('type="{{form.type}}"', 'type="password" password-confirm="{{form.condition}}"').replace(/schemaError/g, 'customError')
	);

}])
        
.directive('passwordConfirm', function(){
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
					error = { code: 'match', message: 'Passwords do not match.' };
					return false;
				}
				delete error;
				return true;
			};
		}
	};
});