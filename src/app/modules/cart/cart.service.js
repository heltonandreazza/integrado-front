class cartSvc {
    /*@ngInject*/
    constructor($http, SERVER) {
        this.$http = $http;
        this.SERVER = SERVER;
    }

}

export default cartSvc;