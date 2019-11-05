/* @ngInject */
function LoginCtrl($scope, $timeout, $stateParams, ionicMaterialInk, ngFB, $state, SERVER) {
    let vm = this;
    localStorage.setItem('appState', $state.current.name);
    //emit SendUp event up
    $scope.$emit("SendUp", false);

    //public methods
    vm.fbLogin = fbLogin;
    vm.fbFakeLogin = fbFakeLogin;

    activate();

    function activate() {
        loadMaterialEffects();
    }

    // FACEBOOK login
    function fbLogin() {
        $scope.$emit("SendUp", true);
        ngFB.login({ scope: 'email, publish_actions, user_friends' }).then(
            function(response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded', response);
                    localStorage.setItem('token', response.authResponse.accessToken);

                    $state.go('app.userprofile');
                } else {
                    alert('Facebook login failed');
                }
            });
    };

    function fbFakeLogin() {
        $scope.$emit("SendUp", true);
        localStorage.setItem('token', "EAAKZBoZAmgI4UBADiMQSveugGriGSzlESkZBrAf7AClZCiZCFQsc1L53WTi5E8skUYkSlrHE2ZCDQlvlM8O8lBu7xEfBuWnEpoyTDTZC94E19tp9O4m4ZBQX9Hjgw0dPWzbcpoUNM3jcQg0wZAZADsE3i2nxnZBmb3qnUTjsFLsDZBTqnRdIAY8ZCZAUww6JnOtW6mC8MC1Sl4djyYWbusxIpy3iIm");
        $state.go('app.userprofile');
    };

    function loadMaterialEffects() {
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
    }

}

export default LoginCtrl;