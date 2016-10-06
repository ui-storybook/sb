declare var sb: stotybook.ISB;

declare namespace stotybook { 

    interface ISB {
        /**
         * Use this method to create new section(page)
         * 
         * @param name The name of section
         */
        section(name: string): ISection;
    }

    interface ISection {
        /**
         * Use this method to create new story point
         * for section
         * 
         * @param name The name of story
         */
        story(name: string): IStory;
    }

    interface IStory {
        /**
         * Use this method to add new states for story
         * 
         * @param title Title of component
         * @param template Template witch need to render
         * @param model Object witch need to include into component scope
         */
        add(
            title: string, 
            template: string, 
            model: Object ): IStory;
    }

}

declare var SBNGHelper: any;