class StorybookController {
  constructor($state, $scope, $mdSidenav) {
    this.$state = $state;
    this.$scope = $scope;
    this.$mdSidenav = $mdSidenav;

    const page = $state.params.state;
    this.page = this.activePage = page ? page : 'preview';

    document.onkeydown = (e) => {
      this.keyActions[e.keyCode] && this.keyActions[e.keyCode]();
    };

    this.keyActions = {
      // 84: () => this.openTemplate(),
      // 80: () => this.openPreview(),
      // 77: () => this.openModel(),
      // 82: () => this.toggleResponsive()
    };

  }

  $postLink() {
    this.preview = angular.element(document.getElementsByTagName('preview')[0]);
    if (this.$state.params.responsive === 'true') {
      this.toggleResponsive();
    }
    if (this.$state.params.split === 'true') {
      this.toggleSplitView();
    }
  }

  toggleResponsive() {
    this.preview.toggleClass('responsive__active');
    this.responsiveActive = !this.responsiveActive;
    this.goTo('responsive', this.responsiveActive);
  }

  toggleSplitView() {
    const page = this.activePage;
    this.openPreview();
    this.splitViewActive = !this.splitViewActive;
    this.goTo('split', this.splitViewActive);
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
      this.activePage = page;
    } else if (page !== 'preview') {
      this.splitPage = page;
    }
  }

  openModel() {
    this.goTo('state', 'model');
  }

  openPreview() {
    this.goTo('state', 'preview');
  }

  openTemplate() {
    this.goTo('state', 'template');
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

}

export default StorybookController;
