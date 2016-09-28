class ModelController {
  constructor($rootScope, $parse) {
    this.$parse = $parse;
    this.listener = $rootScope.$on('render', (event, component) => {
      this.render(event, component);
    });
    this.settings = {
      mode: 'json',
      useWrapMode : true,
      // showGutter: false,
      onLoad: this.onEditorChange.bind(this)
    }
    this.$rootScope = $rootScope;
    this.inFirst = true;
  }

  $onDestroy() {
    this.listener();
  }

  onEditorChange(editor) {
    let session = editor.getSession();
    session.on("change", (e) => {
      this.broadcastModel(session.getValue());
    });
  }

  broadcastModel(model) {
    if (this.inFirst) {
      this.inFirst = false;
      return;
    }
    try {
      let v = JSON.parse(model);
      this.$rootScope.$broadcast('model', v);
    } catch(e) {}
  }

  render(event, component) {
    this.model = JSON.stringify(component.model, null, Number(4));
  }

}

export default ModelController;
