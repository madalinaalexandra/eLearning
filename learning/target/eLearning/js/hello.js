angular
		.module(
				'hello',
				[ 'ngTable', 'angularModalService', 'ngAnimate', 'ui.bootstrap' ])

		.controller(
				'employees',
				[
						'$rootScope',
						'$scope',
						'$http',
						'NgTableParams',
						'ModalService',
						function($rootScope, $scope, $http, NgTableParams,
								ModalService) {
							$http
									.get('/EmployeesManagement/employees')
									.then(
											function(response) {
												$scope.employees = response.data;
												$scope.employeesTable = new NgTableParams(
														{
															page : 1,
															count : 20
														},
														{
															total : $scope.employees.length,
															getData : function(
																	params) {
																$rootScope.datas = $scope.employees;
																$rootScope.datas = ($rootScope.datas)
																		.slice(
																				(params
																						.page() - 1)
																						* params
																								.count(),
																				params
																						.page()
																						* params
																								.count());
																return $rootScope.datas;
															}
														});
											})

							$scope.deleteEmployee = function(idEmployee) {
								$http({
									method : 'DELETE',
									url : '/EmployeesManagement/employees',
									headers : {
										'Content-Type' : 'application/json',
									},
									data : {
										"idEmployee" : idEmployee
									}
								});

							}
							$scope.updatedEmployee = {
									update : []
							}
							$scope.editEmployee = function(index) {
								$http({
									method : 'PUT',
									url : '/EmployeesManagement/employees',
									headers : {
										'Content-Type' : 'application/json'
									},
									data : {
										"idEmployee" : $rootScope.datas[index].idEmployee,
										"firstName" : $scope.updatedEmployee.update['firstName'],
										"lastName" : $scope.updatedEmployee.update['lastName'],
										"birthDate" : $scope.updatedEmployee.update['birthDate'],
										"idJob" : $scope.updatedEmployee.update['idJob'],
										"idDepartment" : $scope.updatedEmployee.update['idDepartment']
									}
								});
								
								$scope.updatedEmployee.update = [];
								
								$scope.refresh();
								$rootScope.datas[index].editMode = false;
							}
							$scope.countChecked = function() {
								var count = 0;
								angular.forEach($rootScope.datas, function(
										value) {
									if (value.isselected)
										count++;
								});

								return count;
							}

							$scope.editSelectedEmployees = function() {
								for (i = 0; i < $rootScope.datas.length; i++) {
									if ($rootScope.datas[i].isselected) {
										$rootScope.datas[i].editMode = true;
									}
								}
							};

							$scope.deleteSelected = function() {
								for (i = 0; i < $rootScope.datas.length; i++) {
									if ($rootScope.datas[i].isselected) {
										$scope
												.deleteEmployee($rootScope.datas[i].idEmployee);
										$scope.refresh();
									}
								}
							};

							$scope.refresh = function() {
								$http.get('/EmployeesManagement/employees')
										.success(function(data) {
											$rootScope.datas = data;
										});
							}
							$scope.field = [];
							$scope.addEmployee = function() {
								var date = '';
								if ($scope.field['birthDate'] != undefined) {
									if ($scope.field['birthDate'].getDate() < 10) {
										date += '0'
												+ $scope.field['birthDate']
														.getDate() + "-";
									} else {
										date += $scope.field['birthDate']
												.getDate()
												+ "-";
									}

									if (($scope.field['birthDate'].getMonth() + 1) < 10) {
										date += '0'
												+ ($scope.field['birthDate']
														.getMonth() + 1) + "-";
									} else {
										date += ($scope.field['birthDate']
												.getMonth() + 1)
												+ "-";
									}
									
									date += $scope.field['birthDate'].getFullYear();
								}
								$http({
									method : 'POST',
									url : '/EmployeesManagement/employees',
									headers : {
										'Content-Type' : 'application/json',
									},
									data : {
										"firstName" : $scope.field['firstName'],
										"lastName" : $scope.field['lastName'],
										"birthDate" : date,
										"idJob" : $scope.field['idJob'],
										"idDepartment" : $scope.field['idDepartment']
									}
								});

								$scope.field['firstName'] = '';
								$scope.field['lastName'] = '';
								$scope.field['birthDate'] = '';
								$scope.field['idJob'] = '';
								$scope.field['idDepartment'] = '';

								$scope.refresh();
							}
							$scope.dateOptions = {
								dateDisabled : disabled,
								formatYear : 'yy',
								minDate : new Date(1900, 1, 1),
								startingDay : 1
							};
							function disabled(data) {
								var date = data.date, mode = data.mode;
								return mode === 'day'
										&& (date.getDay() === 0 || date
												.getDay() === 6);
							}
							$scope.open1 = function() {
								$scope.popup1.opened = true;
							};
							$scope.formats = [ 'dd-MM-yyyy', 'yyyy/MM/dd',
									'dd.MM.yyyy', 'shortDate' ];
							$scope.format = $scope.formats[0];
							$scope.popup1 = {
								opened : false
							};
						} ])
		.filter(
				'titlecase',
				function() {
					return function(input) {
						var upper = [ 0 ];
						var j = 0;
						var string = "";
						for (i = 0; i < input.length; i++) {
							if (input[i].match(/[QWERTYUIOPASDFGHJKLZXCVBNM]/)) {
								upper[++j] = i;
							}
						}

						for (k = 0; k < j; k++) {
							result = input.substr(upper[k], upper[k + 1]
									- upper[k]);
							string += result.charAt(0).toUpperCase()
									+ result.substr(1).toLowerCase()
						}
						var finalResult = input.substr(upper[j]);
						return string + " " + finalResult;
					};

				});
