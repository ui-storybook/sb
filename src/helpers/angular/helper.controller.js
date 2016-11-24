class HelperController {

    constructor($scope, SBInterceptor) {
        this.$scope = $scope;

        // Allowed events from parrent iFrame
        this.events = {
            'component': this.loadComponent,
            'model': this.loadModel
        }
    }

    $onInit() {

        // Tell sb that helper already loaded;
        window.parent.sb.contact();

        // Register lissener for render new component
        this.postMessageListener = window.addEventListener('message', event => {
            event.data && this.events[event.data.type].call(this, event.data);
        }, false);

    }

    $onDestroy() {
        this.postMessageListener();
    }

    loadModel(model) {
        if (model) {
            for (let k in model) {
                this[k] = model[k];
            }
        }
        this.$scope.$apply();
    }

    loadComponent(entity) {
        let component = window.parent.sb.getStory(entity.data);
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