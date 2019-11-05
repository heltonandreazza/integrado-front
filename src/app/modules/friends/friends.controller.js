/* @ngInject */
function FriendsCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, ngFB, $state) {
    let vm = this;
    localStorage.setItem('appState', $state.current.name);
    vm.goCart = goCart;

    activate();

    function activate() {
        // Set Ink
        ionicMaterialInk.displayEffect();

        loadFriends();
    }

    function goCart() {
        console.log('go');
        $state.go('profile');
    }

    function loadFriends() {
        const userToken = localStorage.getItem('token')
        const url = `https://graph.facebook.com/me/friends?access_token=${userToken}`
        try {
            fetch(url, {
              method: 'GET',
            })
            .then(response => response.json())
            .then(result => {
                vm.friends = result.data
                // trigger slides motions
                // setMotion();
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function setMotion() {
        $timeout(() => {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 0);
    }

}

export default FriendsCtrl;