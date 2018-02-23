(function () {
    'use strict';

    var app = angular.module('app');
    var appRoot = "https://justchief.github.io/HotTowel/"; //SchoolMeApp/HotTowelAngular/

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: appRoot, //+ 'SchoolMeApp/HotTowelAngular/app/home/home.html',
                    title: 'home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home"></i> Home'
                    }
                }
            }, {
                url: '/dashboard',
                config: {
                    templateUrl: appRoot + 'SchoolMeApp/HotTowelAngular/app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: appRoot + 'SchoolMeApp/HotTowelAngular/app/admin/admin.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }, {
                url: '/teachers',
                config: {
                    title: 'teachers',
                    templateUrl: appRoot + 'SchoolMeApp/HotTowelAngular/app/Teachers/teachers.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-user"></i> Teachers'
                    }
                }
            }
        ];
    }
})();
