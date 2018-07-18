				var app = angular.module('myApp')
				app.controller('myctrl',function($scope , $http) {
					$scope.colors = [];
							 
					
					$scope.removeColor = function(x) {
						var a = JSON.stringify(x);
						console.log('a' + a)

							var removedcolor = $scope.colors.indexOf(x);
							//console.log(removedcolor)

							$http({
								method: "POST",
								url: "http://localhost:4000/removedinFile",
								dataType: 'json',
								data: { removedcolor },
								headers: { "Content-Type": "application/json" }
							}).then(function(result) {
								//Success
								alert("done");
								}, function(error) {
								//Error
								alert("error");
								}); 

							$scope.colors.splice(removedcolor, 1);
							
					};

					$scope.getColors = function(){
						$http({
							method: "GET",
							url: "http://localhost:4000/colors",
							headers: { "Content-Type": "application/json" }
						}).then(function success(colors) {
							console.log('clrs' +colors.data)
							//console.log(JSON.parse(colors.data))
							var ddd = colors.data;
							// var colorsData = JSON.stringify(colors.data);
							 console.log(ddd.fruits.length)
							// console.log('ccccccccc' + colorsData.fruits)
							//console.log(JSON.stringify(ddd.fruits[i].name))

							for(var i=0;i<ddd.fruits.length;++i)
							{
								var aa = JSON.parse(ddd.fruits[i].replace(/\r?\n?~fruits/g, ''));
								if(aa.name != null)
								$scope.colors.push({name: aa.name, color: aa.color});
								else if(aa == '~')
								continue;
								else
								continue;
								console.log('kkkkkkkkkkkkkkkk')
								
							}
							console.log($scope.colors);
						}, function error(err) {
							console.log(err)
						}) ;	
					};
					$scope.getColors();


					$scope.addField = function() {
				$scope.colors.push({
						name: $scope.newfield.name,
						color: $scope.newfield.color
						
					})
					console.log($scope.newfield.name)
				console.log($scope.newfield.color)

					$http({
						method: "POST",
						url: "http://localhost:4000/addColor",
						dataType: 'json',
						data: {'name': $scope.newfield.name,'color': $scope.newfield.color},
						headers: { "Content-Type": "application/json" }
					}).then(function(result) {
						//Success
						alert("done");
						}, function(error) {
						//Error
						alert("error");
						}); 

					$scope.newfield.name="";
					$scope.newfield.color="";
				
					};
				});