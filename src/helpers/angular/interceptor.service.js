class InterceptorController {

    constructor() {
        this.requests = {};
        this.updateXHROpenMethod();
    }

    updateXHROpenMethod() {
        let self = this;
        this.origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(type, url) {

            // Skip request to browser-sync
            if (url.indexOf('browser-sync/socket.io') === -1) {
                const id = self.generateID();
                const inProgress = true;
                let request = { type, url, inProgress, id };

                self.sendRequestToSB(request);

                this.addEventListener('load', function() {
                    try {
                        request.responce = JSON.parse(this.responseText);
                    } catch (e) { }
                    request.status = this.status;
                    request.statusText = this.statusText;
                    request.inProgress = false;
                    self.sendRequestToSB(request, 'update');
                });
            }

            self.origOpen.apply(this, arguments);
        };
    }

    sendRequestToSB(request) {
        const message = 'xhr';
        window.parent.postMessage({ message, request }, '*');
    }

    generateID() {
        return Math.random().toString(36).substr(2, 10);
    }

}

export default InterceptorController;
