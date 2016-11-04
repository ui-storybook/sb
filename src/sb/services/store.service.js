export default class StoreService {

    constructor() {
        this.components = {};
    }

    component(item) {
        
        if (!item.title || !item.template) {
            throw new Error(`${item.title} is not correct component. Title or template is missing`);
        }

        if (this.components[item.title]) {
            throw new Error(`Component with ${item.title} is alredy defined. Please take another title`);
        }

        this.components[item.title] = item;

    }

    getAllComponents() {
        return this.components;
    }

}