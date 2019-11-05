class UserProfileCtrl {

    /* @ngInject */
    constructor($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, ngFB, $state, userProfileSvc) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.ionicMaterialMotion = ionicMaterialMotion;
        this.ionicMaterialInk = ionicMaterialInk;
        this.ngFB = ngFB;
        this.$state = $state;
        this.userProfileSvc = userProfileSvc;

        this.id = $stateParams.id;

        localStorage.setItem('appState', $state.current.name);
        // Set Header
        this.$scope.$parent.showHeader();
        this.$scope.$parent.clearFabs();
        this.$scope.isExpanded = false;
        this.$scope.$parent.setExpanded(false);
        this.$scope.$parent.setHeaderFab(false);

        //init properties
        this.user = {};
        this.friends = [];

        this.activate();
    }

    activate() {
        // Set Ink
        this.ionicMaterialInk.displayEffect();

        this.loadUser();
        this.loadFriends();
    }

    loadUser() {
        const userToken = localStorage.getItem('token')
        const url = `https://graph.facebook.com/me?fields=id%2Cname%2Cfirst_name%2Clast_name%2Cage_range%2Clink%2Cgender%2Clocale%2Cpicture%2Ctimezone%2Cupdated_time%2Cverified%2Ceducation%2Cabout%2Cemail%20&access_token=${userToken}`
        try {
            fetch(url, {
              method: 'GET',
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', JSON.stringify(result));
                this.user = result;
                localStorage.setItem('profileId', this.user.id);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.userProfileSvc.createUser(this.user);
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    loadFriends() {
        const userToken = localStorage.getItem('token')
        const url = `https://graph.facebook.com/me/friends?access_token=${userToken}`
        try {
            fetch(url, {
              method: 'GET',
            })
            .then(response => response.json())
            .then(result => {
                this.friends = result.data
                // trigger slides motions
                this.setMotion();
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    setMotion() {
        this.$timeout(() => {
            this.ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 0);

        this.$timeout(() => {
            this.ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 0);
    }

    goCart() {
        this.$state.go('app.cart');
    }

}

export default UserProfileCtrl;

    // this.ngFB.api({
    //     path: '/me',
    //     params: { fields: 'id,name,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified,education,about,email ' }
    // }).then(
    //     (user) => {
    //         this.user = user;
    //         localStorage.setItem('profileId', user.id);
    //         localStorage.setItem('user', JSON.stringify(user));
    //         this.userProfileSvc.createUser(this.user);
    //         console.log(this.user);
    //     },
    //     (error) => {
    //         alert('Facebook error: ' + error.error_description);
    //     });
    
    // this.ngFB.api({
    //     path: '/me/friends',
    // }).then(
    //     (taggable_friends) => {
    //         this.friends = taggable_friends.data;
    //         console.log('taggable_friends', this.friends);
    //         // Set Motion
    //         this.setMotion();
    //     },
    //     (error) => {
    //         alert('Facebook error: ' + error.error_description);
    //     });