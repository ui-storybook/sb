class StoriesAPI {

    constructor() {
        this.sections = {};
        this.mocks = {};
    }


    /**
     * Creta new section
     * and return API instance that allow create stories
     * 
     * @param name Section name
     * @returns function SB API instance
     */
    section(name) {
        if (!this.sections[name]) {
            this.sections[name] = {};
        }

        let sectionAPI = {};

        sectionAPI.story = (storyName) => {
            let section = this.sections[name];
            let storyAPI = {};
            storyAPI.add = (title, template, model, docs) => {
                if (!section[storyName]) {
                    section[storyName] = [];
                }
                const id = Math.random().toString(36).substr(2, 9);
                section[storyName].push({ title, template, model, docs, id });
                return storyAPI;
            }
            return storyAPI;
        };

        return sectionAPI;

    }


    /**
     * Get all savad sections
     * 
     * @returns object Sections
     */
    getSections() {
        return this.sections;
    }

    /**
     * Get story from store
     * 
     * @param sbObject Should contaie section, story name and point ID.
     * @returns object Story
     */
    getStory(sbObject) {
        try {
            // Find story from store
            let story = this.sections[sbObject.section][sbObject.story].find(i => i.id === sbObject.id);

            // Check if need load mock for story
            if (story && typeof story.model === 'string') {
                story.model = this.getMock(story.model);
            }
            return story;
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Update story with new data
     * Used for save tempalate and model
     * Use this method if you need to edit any story param
     * 
     * @param sbObject Should contaie section, story name and point ID.
     * @param data Story point that need update
     */
    updateStory(sbObject, data) {
        let storyPoint = this.getStory(sbObject);
        storyPoint = data;
    }

    /**
     * Store mock for stories.
     * Mock can be stored as object.
     * 
     * @param key Mock name
     * @param value Mock value.
     * @param perform Function witch will call with mocked data
     * Use it to perform data structure as you need
     */
    mock(key, value, perform) {
        if (typeof value === 'object') {
            this.mocks[key] = perform ? perform(value) : value;
        } else {
            throw new Error(`Cant't save mock for ${key}. Mock value should be an object. Double check it.`);
        }
    }

    /**
     * Get mock from store
     * 
     * @param key Mock name
     * @returns object Mock
     */
    getMock(key) {
        if (this.mocks[key]) {
            return this.mocks[key];
        } else {
            throw new Error(`Can't find mock for ${key}`);
        }
    }

    registerContactCB(cb) {
        this.contactCB = cb;
    }

    registerReloadCB(cb) {
        this.reloadCB = cb;
    }

    contact() {
        this.contactCB();
    }

    reload() {
        if (this.reloadCB) {
            this.sections = {};
            setTimeout(() => this.reloadCB(), 0);
        }
    }

}

window.sb = new StoriesAPI();