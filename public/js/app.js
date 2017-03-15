'use strict';

var route = new Route();

document.addEventListener('DOMContentLoaded', (ex)=>{
    var anchor = Array.from(document.querySelectorAll('nav a'));
    anchor.forEach((item) => {
        item.addEventListener('click', (ev) => {
            ev.preventDefault();
            route.go(ev.target.href);
        })
    });
})

