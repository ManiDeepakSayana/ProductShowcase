angular.module('app', ['gridster', 'ui.bootstrap', 'ngRoute'])

.directive('integer', function () {
	return {
		require: 'ngModel',
		link: function (scope, ele, attr, ctrl) {
			ctrl.$parsers.unshift(function (viewValue) {
				if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
					return null;
				}
				return parseInt(viewValue, 10);
			});
		}
	};
})

.controller('MainCtrl', function ($scope, $location, $window) {
	$scope.$on('$locationChangeStart', function (e, next, current) {
		$scope.page = next.split('/').splice(-1);
		$scope.styleUrl = 'demo/' + $scope.page + '/style.css'
	});
	$scope.disableForward = false;
	$scope.disableBackward = true;
	$scope.mouseOverAction = false;
	$scope.correction = parseInt(50);
	$scope.categoryValue = "All"
	$scope.toValue = "";
	$scope.priceRange = 300;
	$scope.AllCat = true;
	$scope.MenCat = false;
	$scope.WomenCat = false;
	$scope.ChildCat = false;
	$scope.YouthCat = false;
	$scope.gridsterOpts = {
		columns: 6,
		rowHeight: 150,
		margins: [3, 3],
		outerMargin: false,
		pushing: true,
		floating: true,
		draggable: {
			enabled: false
		},
		resizable: {
			enabled: false,
			handles: ['n', 'e', 's', 'w', 'se', 'sw']
		}
	};
	$scope.range = 10000;
	$scope.priceFilter = function () {

		switch ($scope.priceRange) {
			case "0":
				$scope.range = 25;
				break;
			case "2":
				$scope.range = 50;
				break;
			case "4":
				$scope.range = 100;
				break;
			case "6":
				$scope.range = 1000;
				break;
			case "8":
				$scope.range = 10000;
				break;

		};
		if ($scope.range != 10000) {
			if ($scope.categoryValue != "All") {
				var tempArr = [];
				var col = 0;
				var row = 0;
				var catData = [];
				var main = angular.copy($scope.standardItemsMain);
				if ($scope.toValue == "") {
					angular.forEach(main, function (value, key) {
						if (value.category == $scope.categoryValue) {
							catData.push(value);
						}
					});
				} else {
					angular.forEach(main, function (value, key) {
						if (value.category == $scope.categoryValue && value.to == $scope.toValue) {
							catData.push(value);
						}
					});
				}

				angular.forEach(catData, function (value, key) {
					var dataSet = angular.copy(value);
					if (dataSet.price <= $scope.range) {
						if (col == 6) {
							row++;
							col = 0;
						}
						dataSet.sizeX = 1;
						dataSet.sizeY = 1;
						dataSet.row = row;
						dataSet.col = col;
						tempArr.push(dataSet);
						col++;
					}
				});
				$scope.standardItems = angular.copy(tempArr);
				$scope.disableForward = true;
				$scope.disableBackward = true;
			} else {
				var tempArr = [];
				var col = 0;
				var row = 0;
				var main = angular.copy($scope.standardItemsMain);

				angular.forEach(main, function (value, key) {
					var dataSet = angular.copy(value);
					if (dataSet.price <= $scope.range) {
						if (col == 6) {
							row++;
							col = 0;
						}
						dataSet.sizeX = 1;
						dataSet.sizeY = 1;
						dataSet.row = row;
						dataSet.col = col;
						tempArr.push(dataSet);
						col++;
					}

				});
				$scope.standardItems = angular.copy(tempArr);
				$scope.disableForward = true;
				$scope.disableBackward = true;
			}
		} else {
			$scope.standardItems = [];
			$scope.standardItems = $scope.standardItemsMain.slice(0, 11);
			$scope.disableForward = false;
			$scope.disableBackward = true;
		}

		setTimeout(function () {
			$scope.$apply();
		}, 500);

	};
	$scope.goClickCard = function () {
		$window.location.href = 'http://www.amazon.in/';
		//$location.url('http://www.amazon.in/');
	};
	$scope.changeType = function (value) {
		switch (value) {
			case "All":
				$scope.AllCat = true;
				$scope.MenCat = false;
				$scope.WomenCat = false;
				$scope.ChildCat = false;
				$scope.YouthCat = false;
				$scope.toValue = "";
				$scope.categoryFilter();
				break;
			case "Men":
				$scope.AllCat = false;
				$scope.MenCat = true;
				$scope.WomenCat = false;
				$scope.ChildCat = false;
				$scope.YouthCat = false;
				$scope.toValue = "Men";
				$scope.categoryFilter();
				break;
			case "Women":
				$scope.AllCat = false;
				$scope.MenCat = false;
				$scope.WomenCat = true;
				$scope.ChildCat = false;
				$scope.YouthCat = false;
				$scope.toValue = "Women";
				$scope.categoryFilter();
				break;
			case "Child":
				$scope.AllCat = false;
				$scope.MenCat = false;
				$scope.WomenCat = false;
				$scope.ChildCat = true;
				$scope.YouthCat = false;
				$scope.toValue = "Child";
				$scope.categoryFilter();
				break;
			case "Youth":
				$scope.AllCat = false;
				$scope.MenCat = false;
				$scope.WomenCat = false;
				$scope.ChildCat = false;
				$scope.YouthCat = true;
				$scope.toValue = "Youth";
				$scope.categoryFilter();
				break;
		}
	}
	$scope.currpos = 0;
	$scope.categoryFilter = function () {
		if ($scope.categoryValue != "All") {
			if ($scope.toValue == "") {
				var tempArr = [];
				var col = 0;
				var row = 0;
				angular.forEach($scope.standardItemsMain, function (value, key) {
					var dataSet = angular.copy(value);
					if (dataSet.category == $scope.categoryValue) {
						if (col == 6) {
							row++;
							col = 0;
						}
						dataSet.sizeX = 1;
						dataSet.sizeY = 1;
						dataSet.row = row;
						dataSet.col = col;
						tempArr.push(dataSet);
						col++;
					}


				});
			} else {
				var tempArr = [];
				var col = 0;
				var row = 0;
				angular.forEach($scope.standardItemsMain, function (value, key) {
					var dataSet = angular.copy(value);
					if (dataSet.category == $scope.categoryValue && dataSet.to == $scope.toValue) {
						if (col == 6) {
							row++;
							col = 0;
						}
						dataSet.sizeX = 1;
						dataSet.sizeY = 1;
						dataSet.row = row;
						dataSet.col = col;
						tempArr.push(dataSet);
						col++;
					}


				});
			}

			$scope.standardItems = [];
			$scope.standardItems = angular.copy(tempArr);
			$scope.disableForward = true;
			$scope.disableBackward = true;
		} else {
			if ($scope.toValue != "") {
				var tempArr = [];
				var col = 0;
				var row = 0;
				angular.forEach($scope.standardItemsMain, function (value, key) {
					var dataSet = angular.copy(value);
					if (dataSet.to == $scope.toValue) {
						if (col == 6) {
							row++;
							col = 0;
						}
						dataSet.sizeX = 1;
						dataSet.sizeY = 1;
						dataSet.row = row;
						dataSet.col = col;
						tempArr.push(dataSet);
						col++;
					}


				});
				$scope.standardItems = [];
				$scope.standardItems = angular.copy(tempArr);
				$scope.disableForward = true;
				$scope.disableBackward = true;

			} else {
				$scope.standardItems = [];
				$scope.standardItems = $scope.standardItemsMain.slice(0, 11);
				$scope.disableForward = false;
				$scope.disableBackward = true;
			}

		}

	}
	$scope.nextdata = function () {
		$scope.currpos = $scope.currpos + 11;
		var currLength = angular.copy($scope.currpos);
		currLength = currLength + 11;
		if (currLength >= $scope.standardItemsMain.length) {
			$scope.standardItems = $scope.standardItemsMain.slice($scope.currpos, currLength);
			$scope.disableForward = true;
			$scope.disableBackward = false;
		} else {
			console.log($scope.currpos);
			$scope.standardItems = $scope.standardItemsMain.slice($scope.currpos, currLength);
			$scope.disableBackward = false;
		}

	};
	$scope.previousdata = function () {
		console.log($scope.currpos);
		$scope.currpos = $scope.currpos - 11;
		var currLength = angular.copy($scope.currpos);
		currLength = currLength + 11;
		console.log($scope.standardItemsMain.length);
		if ($scope.currpos == 0) {
			$scope.standardItems = $scope.standardItemsMain.slice($scope.currpos, currLength);
			$scope.disableBackward = true;
			$scope.disableForward = false;
		} else {
			$scope.standardItems = $scope.standardItemsMain.slice($scope.currpos, currLength);
			$scope.disableForward = false;
		}
	}

	// these map directly to gridsterItem options
	$scope.standardItemsMain = [{
		sizeX: 2,
		sizeY: 1,
		row: 0,
		col: 0,
		data: 0,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Trending",
		to: "Men"
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 0,
		col: 2,
		data: 1,
		img: "images/3.jpg",
		name: "TV",
		price: 150.00,
		category: "Electronics",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 2,
		col: 1,
		data: 2,
		img: "images/4.jpg",
		name: "Sofa",
		price: 180.00,
		category: "Home Décor",
		to: ""
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 3,
		data: 3,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Lifestyle",
		to: "Men"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 4,
		data: 4,
		img: "images/5.jpg",
		name: "Dress",
		price: 210.00,
		category: "Trending",
		to: "Women"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 4,
		data: 5,
		img: "images/2.jpg",
		name: "Clock",
		price: 50.00,
		category: "Trending",
		to: ""
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 5,
		data: 6,
		img: "images/6.jpg",
		name: "Child Dress",
		price: 180.00,
		category: "Lifestyle",
		to: "Child"
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 1,
		col: 0,
		data: 7,
		img: "images/3.jpg",
		name: "TV",
		price: 150.00,
		category: "Electronics",
		to: ""
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 4,
		data: 8,
		img: "images/5.jpg",
		name: "Dress",
		price: 210.00,
		category: "Lifestyle",
		to: "Women"
	}, {
		sizeX: 1,
		sizeY: 2,
		row: 1,
		col: 5,
		data: 9,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Lifestyle",
		to: "Men"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 0,
		data: 10,
		img: "images/2.jpg",
		name: "Clock",
		price: 50.00,
		category: "Trending",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 0,
		col: 0,
		data: 11,
		img: "images/3.jpg",
		name: "TV",
		price: 150.00,
		category: "Lifestyle",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 0,
		col: 2,
		data: 12,
		img: "images/4.jpg",
		name: "Sofa",
		price: 180.00,
		category: "Trending",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 2,
		col: 1,
		data: 13,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Lifestyle",
		to: "Men"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 3,
		data: 14,
		img: "images/4.jpg",
		name: "Sofa",
		price: 180.00,
		category: "Home Décor",
		to: ""
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 4,
		data: 15,
		img: "images/5.jpg",
		name: "Dress",
		price: 210.00,
		category: "Lifestyle",
		to: "Women"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 4,
		data: 16,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Lifestyle",
		to: "Men"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 5,
		data: 17,
		img: "images/3.jpg",
		name: "TV",
		price: 150.00,
		category: "Electronics",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 1,
		col: 0,
		data: 18,
		img: "images/2.jpg",
		name: "Clock",
		price: 50.00,
		category: "Lifestyle",
		to: ""
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 1,
		col: 4,
		data: 19,
		img: "images/5.jpg",
		name: "Dress",
		price: 210.00,
		category: "Lifestyle",
		to: "Women"
	}, {
		sizeX: 1,
		sizeY: 2,
		row: 1,
		col: 5,
		data: 20,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Lifestyle",
		to: "Men"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 2,
		col: 0,
		data: 21,
		img: "images/4.jpg",
		name: "Sofa",
		price: 180.00,
		category: "Home Décor",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 0,
		col: 0,
		data: 22,
		img: "images/2.jpg",
		name: "Clock",
		price: 50.00,
		category: "Lifestyle",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 0,
		col: 2,
		data: 23,
		img: "images/2.jpg",
		name: "Clock",
		price: 50.00,
		category: "Trending",
		to: ""
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 1,
		col: 0,
		data: 24,
		img: "images/1.jpg",
		name: "Suit",
		price: 110.00,
		category: "Lifestyle",
		to: "Men"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 4,
		data: 25,
		img: "images/5.jpg",
		name: "Dress",
		price: 210.00,
		category: "Lifestyle",
		to: "Women"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 4,
		data: 5,
		img: "images/6.jpg",
		name: "Child Dress",
		price: 50.00,
		category: "Lifestyle",
		to: "Child"
	}, {
		sizeX: 1,
		sizeY: 1,
		row: 0,
		col: 5,
		data: 6,
		img: "images/6.jpg",
		name: "Child Dress",
		price: 180.00,
		category: "Lifestyle",
		to: "Child"
	}];

	$scope.standardItems = $scope.standardItemsMain.slice(0, 11);
	// map the gridsterItem to the custom item structure
	$scope.customItemMap = {
		sizeX: 'item.size.x',
		sizeY: 'item.size.y',
		row: 'item.position[0]',
		col: 'item.position[1]'
	};

});
