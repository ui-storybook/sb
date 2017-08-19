class MarkdownController {
  constructor($rootScope, $parse, $timeout) {

    Object.assign(this, { $rootScope, $parse, $timeout });

    // Listen for new component data and render it
    this.listener = $rootScope.$on('render', (event, entity) => {
      $timeout(() => this.render(event, entity.component), 0);
    });

  }

  $onDestroy() {
    this.listener();
  }

  render(event, component) {
    this.docs = component.docs;
  }

}

export default MarkdownController;
