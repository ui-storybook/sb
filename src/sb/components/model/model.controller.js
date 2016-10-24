class ModelController {
  constructor($rootScope, $parse) {
    this.$parse = $parse;

    // Listen for new component data and render it
    this.listener = $rootScope.$on('render', (event, component) => {
      this.render(event, component);
    });

    // ACE editor settings
    this.settings = {
      mode: 'json',
      useWrapMode: true,
      onLoad: this.onEditorChange.bind(this)
    }
    this.$rootScope = $rootScope;
    this.inFirst = true;
  }

  $onDestroy() {
    this.listener();
  }

  onEditorChange(editor) {
    editor.$blockScrolling = Infinity;
    let session = editor.getSession();

    // On editor change try to load new component
    session.on("change", (e) => {
      this.broadcastModel(session.getValue());
    });
  }

  broadcastModel(model) {

    // Prevent first paint canges
    if (this.inFirst) {
      this.inFirst = false;
      return;
    }

    // Try to render new molel 
    try {
      let v = JSON.parse(model);
      this.$rootScope.$broadcast('model', v);
    } catch (e) { }
  }

  render(event, component) {

    // We need original template for prevent changes
    // So store original component
    this.originalComponent = component;

    try {
      // Store model 
      this.model = JSON.stringify(component.model, null, Number(4));
      this.renderError = false;
    } catch (e) {
      this.renderError = true;
    }

  }

}

export default ModelController;
