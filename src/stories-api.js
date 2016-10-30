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
                const id = Math.random().toString(36).substr(2, 9);
                section[storyName].push({ title, template, model, id });
                return storyAPI;
            }
            return storyAPI;
        };

        return sectionAPI;

    }

    getSections() {
        return this.sections;
    }

    registerContactCB(cb) {
        this.contactCB = cb;
    }

    contact() {
        this.contactCB();
    }

    getStory(sbObject) {
        try {
            return this.sections[sbObject.section][sbObject.story].find(i => i.id === sbObject.id)
        } catch (e) {
            console.log(e);
        }
    }
    
    updateStory(sbObject, data) {
        let storyPoint = this.getStory(sbObject);
        storyPoint = data;
    }

}

window.sb = new StoriesAPI();