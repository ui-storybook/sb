class TemplateController {
  constructor($rootScope) {

    this.$rootScope = $rootScope;

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
        mode: 'html',
        useWrapMode: true,
        onLoad: this.onEditorChange.bind(this)
      }

      this.errorMessage = 'Unable to load template. Are you pass it with string?'; 

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
      this.$rootScope.$broadcast('updateComponent', this.component);
    } catch (e) {
      console.log(`Can't render template: ${e}`)
    }
  }

  render(event, component) {

    if (typeof component.template !== 'string') {
      this.renderError = true;
      return;
    }

    this.renderError = false;

    this.component = component;
  }

}

export default TemplateController;
