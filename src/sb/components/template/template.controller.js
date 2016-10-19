class TemplateController {
  constructor($rootScope) {

    this.$rootScope = $rootScope;

    // Listen for new component data and render it
    this.listener = $rootScope.$on('render', (event, component) => {
      this.render(event, component);
    });

    // ACE editor settings
    this.settings = {
      mode: 'html',
      useWrapMode: true,
      onLoad: this.onEditorChange.bind(this)
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

  broadcastModel(template) {

    // Prevent first paint canges
    if (this.inFirst) {
      this.inFirst = false;
      return;
    }

    // Update component template
    this.component.template = template;

    // Try to render new template 
    try {
      this.$rootScope.$broadcast('template', this.component);
    } catch (e) { 
      console.log(`Can't render template: ${e}`) 
    }
  }

  render(event, component) {
    
    // We need original template for prevent changes
    // So store original component
    this.originalComponent = component;

    // Store copy of component
    this.component = angular.copy(component);
  }

}

export default TemplateController;
