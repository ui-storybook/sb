class TemplateController {
  constructor($rootScope) {
    this.listener = $rootScope.$on('render', (event, component) => {
      this.render(event, component);
    });
  }

  $onDestroy() {
    this.listener();
  }

  render(event, component) {
    this.component = component;
  }

}

export default TemplateController;
