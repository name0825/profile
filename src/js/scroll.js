window.addEventListener("load", function() {
    const header = document.body.querySelector(".header");
    const container = document.body.querySelector(".container");

    let currentPage, prevPage;

    function update() {
        let top = container.scrollTop;
        let page = Math.floor(top / container.clientHeight);

        if (currentPage == undefined || page !== currentPage) {
            prevPage = currentPage;
            currentPage = page;

            header.children[prevPage ?? 0].querySelector("span").classList.remove("select");
            header.children[currentPage].querySelector("span").classList.add("select");
        }
    }

    function scrollTo(index) {
        container.scrollTop = index * container.clientHeight;
    }

    update();

    for (let i = 0; i < header.children.length; i++) {
        header.children[i].addEventListener("click", function() {
            scrollTo(i);
        });
    }
    // check scrollend event
    if (typeof container.onscrollend !== "function")
        container.addEventListener("scroll", update);
    else
        container.addEventListener("scrollend", update);
});