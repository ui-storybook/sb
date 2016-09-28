class StoriesAPI {

    constructor() {
        this.sections = {};
    }

    section(name) {
        if (!this.sections[name]) {
            this.sections[name] = {};
        }

        let sectionAPI = {};

        sectionAPI.story = (storyName) => {
            let section = this.sections[name];
            let storyAPI = {};
            storyAPI.add = (title, template, model) => {
                if (!section[storyName]) {
                    section[storyName] = [];
                }
                section[storyName].push({ title, template, model });
            }
            return storyAPI;
        };

        return sectionAPI;

    }

    getSections() {
        return this.sections;
    }

}

window.sb = new StoriesAPI();