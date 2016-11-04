import {
  devicesSize,
  devices
} from './devices';

class PreviewController {

  constructor($rootScope, $scope, $state, $stateParams) {

    this.$state = $state;
    this.$stateParams = $stateParams;

    this.listener = $rootScope.$on('render', (event, entity) => {
      this.setDocumentTitle(entity.sbObject.point);
      this.render(event, {
        type: 'component',
        data: entity.sbObject
      });
    });

    this.templateListener = $rootScope.$on('updateComponent', (event, component) => {
      this.updateSBComponent(component);
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
    try {
      this._bridge.postMessage(data, '*');
    } catch (e) {
      console.log(e);
    }
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

  updateSBComponent(component, type) {
    let params = {
      section: this.$stateParams.section,
      story: this.$stateParams.story,
      id: component.id
    };
    window.sb.updateStory(params, component);
    this.render(event, {
      type: 'component',
      data: params
    });     
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

  setDocumentTitle(title) {
    document.title = `${title} — SB`;
  }

}

export default PreviewController;
