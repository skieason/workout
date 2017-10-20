angular.module('app', ['ui.router', 'ngMaterial'])

.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'HomeCtrl'
			})
			.state('build', {
				url: '/build',
				templateUrl: '/build.html',
				controller: 'BuildCtrl'
			});
			// .state('posts', {
			// 	url: '/posts/{id}',
			// 	templateUrl: '/posts.html',
			// 	controller: 'PostCtrl'
			// });
		$urlRouterProvider.otherwise('home');
}])

.factory('buildFactory', [function(){
	 var object = {
		 workouts: []
	 };
	 return object;
 }])

.controller('HomeCtrl', [
	'$scope',
	'buildFactory',
	function($scope, buildFactory){
		$scope.workouts = buildFactory.workouts;
	}
])

.controller('BuildCtrl', [
	'$scope',
	'$stateParams',
	'buildFactory',
	'$state',
	function($scope, $stateParams, buildFactory, $state){
		$scope.setCount = 1;
		$scope.reps = null;
		$scope.sets = [];
		$scope.sets.push({
			reps: null
		});
		$scope.add = function () {
			var object = {
				name: $scope.name,
				setCount: $scope.setCount,
				description: $scope.description,
				sets: $scope.sets
			}
			buildFactory.workouts.push(object);
			$state.go('home');
		};

		$scope.getNumber = function() {
			$scope.sets = [];
			for (var i = 0; i < $scope.setCount; i++) {
				$scope.sets.push({
					reps: $scope.reps
				});
			}
			return $scope.sets;
		};

		$scope.addSets = function (reps) {
			for (var i = 0 ; i < $scope.sets.length; i++) {
				$scope.sets[i].reps = reps;
			}
		};

		$scope.getLength = function(num) {
			return new Array(num);
		};
	}
]);
