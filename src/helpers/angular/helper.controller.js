class HelperController {

    constructor($scope) {
        this.$scope = $scope;
        this.events = {
            'component': this.loadComponent,
            'model': this.loadModel
        }
    }

    $onInit() {
        this.postMessageListener = window.addEventListener('message', event => {
            event.data && this.events[event.data.type].call(this, event.data.data);
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