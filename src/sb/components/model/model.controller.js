class ModelController {
  constructor($rootScope, $parse) {
    this.$parse = $parse;

    if (window.sbtype === 'react') {
      this.renderError = true;
      this.errorMessage = 'Sorry but for now SB not support live component editor for React. We work on this. Stay tuned!';
    } else {

      // Listen for new component data and render it
      this.listener = $rootScope.$on('render', (event, entity) => {
        this.render(event, entity.component);
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
      this.component.model = v; 
      this.$rootScope.$broadcast('updateComponent', this.component);
    } catch (e) { }
  }

  render(event, component) {

    // We need original template for prevent changes
    // So store original component
    this.originalComponent = component;
    this.component = component;

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
