class HomePageShortItemFactory extends ItemFactory {
    getItems() {
        let shortItems = [];
        let shortItemDivs = document.getElementsByTagName('ytm-shorts-lockup-view-model');
        for (let shortItemDiv of shortItemDivs) {
            if (HomePageShortItem.validate(shortItemDiv)) {
                let shortItem = new HomePageShortItem(shortItemDiv);
                shortItems.push(shortItem);
            }
        }

        return shortItems;
    }
}