'use strict';

class Page {
    constructor(name, pathpattern) {
        this._name = name;
        this._dom = document.querySelector('#' + name);
        this._pathpattern = pathpattern;
    }

    in (data) {
        return new Promise((resolve, reject) => {
            const onTransitionEnd = () => {
                this._dom.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            };

            this._dom.classList.add('visible');
            this._dom.addEventListener('transitionend', onTransitionEnd);
        });
    }

    out(data) {
        return new Promise((resolve, reject) => {
            const onTransitionEnd = () => {
                this._dom.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            };

            this._dom.classList.remove('visible');
            this._dom.addEventListener('transitionend', onTransitionEnd);
        });
    }

    update(data) {
        console.log(data);
        return Promise.resolve();
    }

}