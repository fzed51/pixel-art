'use strict';

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
        const path = window.location.pathname;
        console.log(path);
        const routes = Array.from(this._routes.keys());
        const route = routes.find(r => r.test(path));
        if (!route) {
            return;
        }
        console.log(route);
        const data = route.exec(path);

        // Store the new view.
        this._newView = this._routes.get(route);

        // We don't want to create more promises for the outgoing view animation, because then we get a lot of hanging Promises, so we add a boolean gate here to stop if there's already a transition running.
        if (this._isTransitioningBetweenViews) {
            return Promise.resolve();
        }
        this._isTransitioningBetweenViews = true;

        // Assume that there's no outgoing animation required.
        let outViewPromise = Promise.resolve();

        // If there is a current view...
        if (this._currentView) {
            // ...and it's the one we already have, just update it.
            if (this._currentView === this._newView) {
                // No transitions, so remove the boolean gate.
                this._isTransitioningBetweenViews = false;

                return this._currentView.update(data);
            }

            // Otherwise animate it out, and take the Promise made by the view as an
            // indicator that the view is done.
            outViewPromise = this._currentView.out(data);
        }

        // Whenever the outgoing animation is done (which may be immediately if
        // there isn't one), update the references to the current view, allow
        // outgoing animations to proceed.
        return outViewPromise
            .then(_ => {
                this._currentView = this._newView;
                this._isTransitioningBetweenViews = false;
                return this._newView.in(data);
            });
    }

    go(url) {
        window.history.pushState(null, null, url);
        this._onchange();
    }

}