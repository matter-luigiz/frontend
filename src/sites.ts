const fullSite = (site: string) => {
    switch (site) {
        case 'Cradle':
            return 'Cradle to Cradle Product Registry';
        default:
            return site
    }
};

const shortSite = (site: string) => {
    switch (site) {
        case 'Cradle to Cradle Product Registry':
            return 'Cradle';
        default:
            return site;
    }
}

export {fullSite, shortSite};