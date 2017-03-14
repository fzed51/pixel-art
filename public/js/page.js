class Page {
    constructor(name, pathpattern) {
        this._name = name;
        this._dom = document.querySelector('#' + name);
        this._pathpattern = pathpattern;
    }
}