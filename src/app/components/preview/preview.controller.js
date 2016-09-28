import {
  devicesSize,
  devices
}  from './devices';

class PreviewController {

  constructor($rootScope, $scope, $state) {

    this.$state = $state;

    this.listener = $rootScope.$on('render', (event, component) => {
      this.render(event, {
        type: 'component',
        data: component
      });
    });

    this.modelListener = $rootScope.$on('model', (event, model) => {
      this.render(event, {
        type: 'model',
        data: model
      });
    });

    this.devices = devices;

    this.devicesSize = devicesSize;

    this.initDevice();

    $rootScope.$on('angular-resizable.resizeEnd', (event, args) => {
      if (args.width) {
        this.dynamicSize.width = args.width;
      }
      if (args.height) {
        this.dynamicSize.height = args.height;
      }
      this.selectedDevice = this.devices[0];
    });

  }

  $postLink() {
    this._bridge = window.frames.preview;
  }

  $onDestroy() {
    this.listener();
  }

  render(event, data) {
    this._bridge.postMessage(data, '*');
  }

  initDevice() {
    let device = this.$state.params.device;
    if (device) {
      this.selectedDevice = device;
      this.dynamicSize = this.devicesSize[device];
    } else {
      this.dynamicSize = {
        width: 600,
        height: 450
      }
      this.selectedDevice = this.devices[0];
    }
  }

  selectDevice(device) {
    let params = this.$state.params;
    params.device = device;
    this.$state.go('main.storybook', params, {
      reload: false,
      location: true,
      inherit: false,
      notify: false
    });
    this.dynamicSize = this.devicesSize[device];
  }

}

export default PreviewController;
