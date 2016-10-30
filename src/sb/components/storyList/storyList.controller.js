class StoryListController {

  constructor($rootScope, $window, $state, $mdSidenav, $scope) {
    "ngInject";

    this.$mdSidenav = $mdSidenav;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.$state = $state;
    this.$scope = $scope;

    sb.registerContactCB(() => {
      this.selectComponent();
      this.$scope.$apply();
    });

    sb.registerReloadCB(() => {
      this.initStories();
      this.$scope.$apply();
    });

    this.initStories();

    this.$mdSidenav('left').open();

  }

  initStories() {
    // Get all section
    this.sections = sb.getSections();

    // List of avaliable sections
    this.sectionsList = Object.keys(this.sections);

    // Active stories 
    this.stories = {};

    // Active story point
    this.active = this.active ? this.active : {};

    // Select story
    this.selectStory();
  }

  openSearch() {
    this.searchPanel = true;
    setTimeout(() => document.getElementsByClassName('search__input')[0].focus(), 0);
  }

  closeSearch() {
    this.search = '';
    this.searchPanel = false;
  }

  selectSection(sectionTitle) {
    this.selectStory(sectionTitle)
    this.selectComponent(true);
  }

  selectStory(sectionTitle) {
    const section = sectionTitle || this.$state.params.section;
    if (section && this.sections[section]) {
      this.selectedSection = section;
      this.stories = this.sections[section];
    } else {
      this.selectedSection = this.sectionsList[0];
      this.stories = this.sections[this.selectedSection];
    }
  }

  selectComponentFromList(story, component) {
    let params = this.$state.params;
    this.active = { story, point: component.title, section: this.selectedSection };

    params.story = story;
    params.point = component.title;
    params.section = this.selectedSection;

    this.$state.go('main.storybook', params, {
      reload: false,
      location: true,
      inherit: false,
      notify: false
    });

    this.closeSearch();

    this.$rootScope.$broadcast('render', {
      component,
      sbObject: {
        id: component.id,
        story,
        point: component.title,
        section: this.selectedSection
      }
    });
  }

  selectComponent(force) {
    let section, storyTitle, pointTitle, component;
    let params = this.$state.params;

    if (!force && this.$state.params.story && this.$state.params.point) {
      section = this.$state.params.section;
      storyTitle = this.$state.params.story;
      pointTitle = this.$state.params.point;
      if (this.sections[section] && this.sections[section][storyTitle]) {
        component = this.sections[section][storyTitle].find(point => point.title === pointTitle);
      }
    }

    if (!component) {
      storyTitle = Object.keys(this.stories)[0];
      component = this.stories[storyTitle][0];
    }

    this.active = { story: storyTitle, point: pointTitle, section: this.selectedSection };

    params.story = storyTitle;
    params.point = component.title;
    params.section = this.selectedSection;

    this.$state.go('main.storybook', params, {
      reload: false,
      location: true,
      inherit: false,
      notify: false
    });

    this.$rootScope.$broadcast('render', {
      component,
      sbObject: {
        id: component.id,
        story: storyTitle,
        point: component.title,
        section: this.selectedSection
      }
    });

  }

  sloseSidebar() {
    this.$mdSidenav('left').close();
  }

}

export default StoryListController;
