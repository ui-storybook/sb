class StorybookController {
  constructor($state, $scope, $mdSidenav, storeService) {
    this.$state = $state;
    this.$scope = $scope;
    this.$mdSidenav = $mdSidenav;

    const page = $state.params.state;
    this.page = this.activePage = page ? page : 'preview';

    this.components = storeService.getAllComponents();
    this.componentsList = Object.keys(this.components);

    this.isPluginBoxOpen = false;
  }

  $onDestroy() {
    this.listener = null;
    this.iframeListener = null;
  }

  $postLink() {
    if (this.$state.params.responsive === 'true') {
      this.toggleResponsive();
    }
    if (this.$state.params.split === 'true') {
      this.toggleSplitView();
    }
    this.initHotKeys();
  }

  showComponent(page) {
    if (!this.splitViewActive) {
      return this.activePage === page;
    } else {
      return this.splitPage === page || page === 'preview';
    }
  }

  toggleResponsive() {
    this.responsiveActive = !this.responsiveActive;
  }

  toggleSplitView() {
    const page = this.activePage;
    this.splitViewActive = !this.splitViewActive;
    if (this.splitViewActive) {
      this.splitPage = page !== 'preview' ? page : 'model';
    }
  }

  showViewModel(page) {
    if (!this.splitViewActive) {
      return this.activePage === page;
    } else {
      return this.splitPage === page;
    }
  }

  selectPage(page) {
    if (!this.splitViewActive) {
      this.activePage = this.components[page].title;
    } else if (page !== 'preview') {
      this.splitPage = this.components[page].title;
    }
  }

  goTo(k, v) {
    let params = this.$state.params;
    params[k] = v;
    this.$state.go('main.storybook', params, {
      reload: false,
      location: true,
      inherit: false,
      notify: false
    });
    if (k === 'state') {
      this.page = v;
      this.selectPage(v);
    }
  }

  isSidebarOpen() {
    return this.$mdSidenav('left').isOpen();
  }

  openSidebar() {
    this.$mdSidenav('left').open();
  }

  initHotKeys() {

    for (let v in this.components) {
      const component = this.components[v];
      if (component.hotkey) {
        this.listener.bind(component.hotkey, component.cb);
        this.iframeListener.bind(component.hotkey, component.cb);
      }
    }
    Mousetrap.bind(['command+b', 'ctrl+b'], () => {
      this.openPluginBox();
      this.$scope.$apply();
      return false;
    });
  }

  openPluginBox() {
    this.isPluginBoxOpen = !this.isPluginBoxOpen;
  }

}

export default StorybookController;
