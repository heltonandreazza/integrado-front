class commonSvc {
    /*@ngInject*/
    constructor($http, SERVER) {
        this.$http = $http;
        this.SERVER = SERVER;
    }

    getBrewery(id) {
        return this.$http({
                method: 'GET',
                url: this.SERVER.URL + 'brewery/' + id
            })
            .then(response => response.data);
    };

    getBreweryByOwner() {
        return this.$http({
                method: 'POST',
                url: this.SERVER.URL + 'getBreweryByOwner',
                data: {
                    profileId: localStorage.getItem('profileId')
                }
            })
            .then(response => response.data);
    };

    getCartItems() {
        let defaultCart = {
            items: [],
            total: 0
        }
        let cart = JSON.parse(localStorage.getItem(`cart${localStorage.getItem('profileId')}`))

        if(!cart) {
            this.setCartItems(defaultCart)
            cart = JSON.parse(localStorage.getItem(`cart${localStorage.getItem('profileId')}`))
        }
        // console.log(cart)
        return cart
    };

    setCartItems(cart) {
        localStorage.setItem(`cart${localStorage.getItem('profileId')}`, JSON.stringify(cart))
    }

    getTotalCart(cart) {
        return cart.items.map(p => p.quantity*p.price).reduce((a, b) => a + b, 0)
    }

    addToCart(product) {
        product.profileId = localStorage.getItem('profileId');
        const cart = this.getCartItems()

        const foundItem = cart.items.find(p => p._id === product._id)
        if (foundItem) {
            foundItem.quantity = foundItem.quantity + product.quantity
        } else {
            cart.items.push(product)
        }
        
        cart.total = this.getTotalCart(cart)
        this.setCartItems(cart)
    }

    removeFromCart(id) {
        const cart = this.getCartItems()
        const index = cart.items.findIndex(p => p._id === id)
        cart.items.splice(index, 1)
        cart.total = this.getTotalCart(cart)
        this.setCartItems(cart)
    };

    plusOne(id) {
        const cart = this.getCartItems()

        const foundItem = cart.items.find(p => p._id === id)
        if (foundItem) {
            foundItem.quantity = foundItem.quantity + 1
        }

        cart.total = this.getTotalCart(cart)
        this.setCartItems(cart)

        return cart
    };

    minusOne(id) {
        const cart = this.getCartItems()

        const foundItem = cart.items.find(p => p._id === id)
        if (foundItem) {
            foundItem.quantity = foundItem.quantity > 1 ? foundItem.quantity - 1 : foundItem.quantity
        }

        cart.total = this.getTotalCart(cart)
        this.setCartItems(cart)

        return cart
    };

    cleanupCart() {
        localStorage.setItem(`cart${localStorage.getItem('profileId')}`, null)
    }
}

export default commonSvc;