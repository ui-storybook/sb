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

    // of(name) {
    //     let api = {
    //         name
    //     };

    //     api.add = (title, story, model) => {
    //         this.newStoryPoint(name, title, story, model);
    //         return api;
    //     }

    //     return api;
    // }

    // newStoryPoint(of, title, story, model) {
    //     if (!this.stories[of]) {
    //         this.stories[of] = [];
    //     }
    //     this.stories[of].push({
    //         title,
    //         story,
    //         model
    //     });
    // }

    getSections() {
        return this.sections;
    }

}

window.sb = new StoriesAPI();