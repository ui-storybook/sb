class InterceptorController {
    constructor($rootScope, $parse, $http) {
        this.$rootScope = $rootScope;
        this.requests = {};

        this.updateXHROpenMethod();
        $http.get('https://randomuser.me/api/');
        $http.post('https://randomuser.me/api/', {});

    }

    $onDestroy() {
        XMLHttpRequest.prototype.open = this.origOpen;
    }

    copyResponce($event, responce) {
        window.prompt("Copy to clipboard: CMD(Ctrl)+C, Enter", JSON.stringify(responce));
        $event.stopImmediatePropagation();
    }

    updateXHROpenMethod() {
        let self = this;
        this.origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            console.log(this);
            const id = self.generateID();
            let request = {
                type: arguments[0],
                url: arguments[1],
                inProgress: true
            };
            self.requests[id] = request;
            this.addEventListener('load', function() {
                try {
                    self.requests[id].responce = JSON.parse(this.responseText);
                } catch (e) { }
                self.requests[id].status = this.status;
                self.requests[id].statusText = this.statusText;
                self.requests[id].inProgress = false;
            });
            self.origOpen.apply(this, arguments);
        };
    }

    openRequest(request) {
        if (request.selected) {
            this.activeRequest.selected = false;
            return;
        }
        if (this.activeRequest) {
            this.activeRequest.selected = false;
        }
        this.activeRequest = request;
        this.activeRequest.selected = true;
    }

    generateID() {
        return Math.random().toString(36).substr(2, 10);
    }

}

export default InterceptorController;
