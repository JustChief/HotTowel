(function () {
    'use strict';
    var controllerId = 'checkUser';
    angular.module('app').controller(controllerId, ['common', '$location', '$scope', '$uibModal', '$uibModalInstance', 'config', 'datacontext', checkUser]);  //, '$modalInstance'

    function checkUser(common, $location, scope, $uibModal, $uibModalInstanceconfig, datacontext) { // 
        var vm = this;

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.dialogTitle = 'Registration Form';

        vm.userInfo;

        vm.loader = true;
        vm.list = false;
        vm.waiting = 'http://awsschoolmeappv2.us-east-1.elasticbeanstalk.com/Content/images/list-spinner.gif';

        vm.userInfo = {
            NameLast: "",
            NameFirst: "",
            MiddleInitial: "",
            Rank: "",
            Organization: "",
            /*LoginName: config.userSharePointInfo.LoginName,
            Email: config.userSharePointInfo.Email,
            SharePointID: config.userSharePointInfo.SharePointID,*/
            Justification: ""
        };

        activate();
        var promises = [];	//getUserInfo()

        function activate() {
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Registration');
                });
        }

        vm.cancel = function () {
            log("Cancel edit...");
            $uibModalInstance.dismiss('cancel');
        }

        function getUserInfo() {
            //vm.userInfo = config.userSharePointInfo;
            //	return vm.userInfo;
        }


        /*** Update Functions**/
        vm.sendRegistration = sendRegistration;
        function sendRegistration() {

            var dfd = $.Deferred();
            var tableName = "TblRequestAccess";
            var callbacks = true;
            var initValues = [
                ['LastName', vm.userInfo.NameLast],
                ['FirstName', vm.userInfo.NameFirst],
                ['MiddleInitial', vm.userInfo.NameMiddle],
                ['Rank', vm.userInfo.Rank],
                ['Organization', vm.userInfo.Organization],
                ['LoginName', vm.userInfo.LoginName],
                ['Email', vm.userInfo.Email],
                ['SharePointID', vm.userInfo.SharePointID],
                ['Justification', vm.userInfo.Justification],
                ['Archive', false]
            ];

            return datacontext.createEntity(initValues, tableName, callbacks)
                .then(function (data) {
                    dfd.resolve(data);
                    //forceRefresh();
                    var email = "cashif.pritchard.ctr@usmc.mil";
                    var message = "Access Request";
                    var cc = vm.userInfo.Email;
                    var subject = "HQMC App Access Request";
                    var bodyMessage = "HQMC App Access Request" + "\n" + "\n" +
                                        "Last Name: " + vm.userInfo.NameLast + "\n" +
                                        "First Name: " + vm.userInfo.NameFirst + "\n" +
                                        "Middle Initial: " + vm.userInfo.NameMiddle + "\n" +
                                        "Rank: " + vm.userInfo.Rank + "\n" +
                                        "Organization: " + vm.userInfo.Organization + "\n" +
                                        "LoginName: " + vm.userInfo.LoginName + "\n" +
                                        "Email: " + vm.userInfo.Email + "\n" +
                                        "ID: " + vm.userInfo.SharePointID + "\n" +
                                        "Justification: " + vm.userInfo.Justification + "\n";
                    var bodyMessage2 = encodeURIComponent(bodyMessage);
                    //var mailtoLink = 'mailto:'+email+'&cc='+cc+'?subject='+subject+'&body='+bodyMessage;
                    //vm.win = window.open(mailtoLink);
                    vm.win = window.location.href = "mailto:cashif.pritchard.ctr@usmc.mil?subject=" + subject + "&cc=" + cc + "&body=" + bodyMessage2;
                    alert("Thank you for your submission! Please allow 24 - 48 hours for this request.");
                    vm.cancel();

                });

        }

    }
})();