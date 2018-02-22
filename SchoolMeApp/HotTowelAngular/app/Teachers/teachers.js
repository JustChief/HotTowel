(function () {
    'use strict';
    var controllerId = 'teachers';
    angular.module('app').controller(controllerId, ['common', 'datacontext', teachers]);

    function teachers(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Teachers';

        activate();

        function activate() {
            var promises = [getPeople()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Activated Teachers View');
                });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }

    }
})();