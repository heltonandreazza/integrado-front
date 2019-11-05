class CartCtrl {
    /* @ngInject */
    constructor($scope, $stateParams, $timeout, ngFB, ionicMaterialMotion, ionicMaterialInk, $state, commonSvc, cartSvc) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.ngFB = ngFB;
        this.ionicMaterialMotion = ionicMaterialMotion;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$state = $state;
        this.commonSvc = commonSvc;
        this.cartSvc = cartSvc;

        this.activate();

        localStorage.setItem('appState', this.$state.current.name);
    }


    activate() {
        this.loadCartItems();
        this.ionicMaterialInk.displayEffect();
    }

    setImages() {
        this.$timeout(() => {
            this.beers.forEach(b => document.getElementById(b.item._id).src = b.item.image)
        }, 0);
    }

    loadCartItems() {
        const cart = this.commonSvc.getCartItems()
        this.cart = cart;
        this.beers = cart.items;
        this.setMotion();
        this.setImages();
    }

    minusOne(id) {
        const cart = this.commonSvc.minusOne(id)
        this.cart = cart
    }

    plusOne(id) {
        const cart = this.commonSvc.plusOne(id)
        this.cart = cart
    }

    removeFromCart(id) {
        this.commonSvc.removeFromCart(id)
        this.activate();
    }

    goProductDetails(id) {
        this.$state.go('app.product', { id: id });
    }

    pay() {
        this.$state.go('app.payment', { totalPrice: this.cart.total });
    }
    
    setMotion() {
        this.$timeout(() => {
            this.ionicMaterialMotion.blinds({
                startVelocity: 4100
            });
        }, 0);
    }

}

export default CartCtrl;