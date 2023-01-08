const fullSite = (site: string) => {
    switch (site) {
        case 'Cradle':
            return 'Cradle to Cradle';
        default:
            return site
    }
};

const shortSite = (site: string) => {
    switch (site) {
        case 'Cradle to Cradle':
            return 'Cradle';
        default:
            return site;
    }
}

export {fullSite, shortSite};