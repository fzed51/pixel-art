class Route {

    constructor() {
        this._routes = new Map();
        Array.from(document.querySelectorAll('div.page')).forEach((item) => {
            if (!item.dataset.route)
                return;
            this._createRoute(new RegExp(item.dataset.route), item.id)
        });
        this._InitEvent();
    }

    _createRoute(route, id) {
        if (this._routes.has(route))
            return console.warn(`La page ${route} existe déjà !`);
        this._routes.set(route, new Page(id, route));
    }

    _InitEvent() {
        const _onchange = this._onchange.bind(this);
        document.addEventListener('DOMContentLoaded', _onchange);
        window.addEventListener('popstate', _onchange);
    }

    _onchange() {
        console.log('onChange');
    }

}