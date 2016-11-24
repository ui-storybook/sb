class InterceptorController {
    constructor($scope) {
        this.$scope = $scope;
        this.requests = {};

        const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        const eventer = window[eventMethod];
        const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        eventer(messageEvent, (e) => {
            if (e.data.message === 'xhr') {
                this.updateResponce(e.data);
            }
        }, false);
    }

    updateResponce(data) {
        this.requests[data.request.id] = data.request;
        this.$scope.$apply();
    }

    copyResponce($event, responce) {
        window.prompt("Copy to clipboard: CMD(Ctrl)+C, Enter", JSON.stringify(responce));
        $event.stopImmediatePropagation();
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

}

export default InterceptorController;
