class Route {
    constructor(){
        this._routes = [];
        Array.from(document.querySelectorAll('div.page')).forEach((item)=>{
            this._routes.push(
                new Page (
                    item.id, 
                    new RegExp(item.dataset.route)
                    )
                );
        });
    }
}