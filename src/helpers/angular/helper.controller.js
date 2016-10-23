class HelperController {

    constructor($scope) {
        this.$scope = $scope;

        // Allowed events from parrent iFrame
        this.events = {
            'component': this.loadComponent
        }
    }

    $onInit() {

        // Tell sb that helper already loaded;
        window.parent.sb.contact();

        // Register lissener for render new component
        this.postMessageListener = window.addEventListener('message', event => {
            event.data && this.events[event.data.type].call(this, event.data.data);
        }, false);

    }

    $onDestroy() {
        this.postMessageListener();
    }

    loadComponent(component) {
        this.template = component.template;
        if (component.model) {
            for (let k in component.model) {
                this[k] = component.model[k];
            }
        }
        this.$scope.$apply();
    }

}

export default HelperController;