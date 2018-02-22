(function () {
    'use strict';
    var controllerId = 'home';
    angular.module('app').controller(controllerId, ['common', '$uibModal', '$uibModalInstance', home]);

    function home(common, $uibModal, $uibModalInstance) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'My Home, This means it worked, For real this time';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated New View'); });
        }

        $("#register").click(function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'http://awsschoolmeappv2.us-east-1.elasticbeanstalk.com/app/home/modals/checkUser.html',
                controller: 'checkUser as vm',
                size: 'lg',
                backdrop: 'static'
            });

            modalInstance.result.then(function (data) {

            }, function () {
                log("Modal Dismissed");
            });

        });

    }
})();