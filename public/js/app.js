var route = new Route();

Array.from(document.querySelector('nav a')).forEach((item) => {
    item.addEventListener('click', (ev) => {
        ev.preventDefault();
        route.go(ev.target.href);
    })
});