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

    // Get all section
    this.sections = sb.getSections();

    // List of avaliable sections
    this.sectionsList = Object.keys(this.sections);

    // Active stories 
    this.stories = {};

    // Active story point
    this.active = {};

    // Select story
    this.selectStory();

    this.$mdSidenav('left').open();

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
    params.story = this.selectedSection;

    this.$state.go('main.storybook', params, {
      reload: false,
      location: true,
      inherit: false,
      notify: false
    });

    this.$rootScope.$broadcast('render', component);
  }

  selectComponent(force) {
    let storyTitle, pointTitle, component;
    let params = this.$state.params;

    if (!force && this.$state.params.story && this.$state.params.point) {
      storyTitle = this.$state.params.story;
      pointTitle = this.$state.params.point;
      if (this.stories[storyTitle]) {
        component = this.stories[storyTitle].find(point => point.title === pointTitle);
      }
    }

    if (!component) {
      storyTitle = Object.keys(this.stories)[0];
      component = this.stories[storyTitle][0];
    }

    this.active = { story: storyTitle, point: pointTitle, section: this.selectedSection };

    params.story = storyTitle;
    params.point = component.title;
    params.story = this.selectedSection;

    this.$state.go('main.storybook', params, {
      reload: false,
      location: true,
      inherit: false,
      notify: false
    });

    this.$rootScope.$broadcast('render', component);

  }

  sloseSidebar() {
    this.$mdSidenav('left').close();
  }

}

export default StoryListController;
