window.addEventListener("load", function() {
    const header = document.body.querySelector(".header");
    const container = document.body.querySelector(".container");

    let currentPage, prevPage;

    function update() {
        let top = container.scrollTop;
        let page = Math.floor(top / container.clientHeight);

        if (currentPage == undefined || page !== currentPage) {
            prevPage = Math.min(Math.max(currentPage ?? 0, 0), header.children.length - 1);
            currentPage = Math.min(Math.max(page, 0), header.children.length - 1);

            header.children[prevPage].querySelector("span").classList.remove("select");
            header.children[currentPage].querySelector("span").classList.add("select");
        }
    }

    function scrollTo(index) {
        container.scrollTop = index * container.clientHeight;
    }

    function scrollEnd() {
        console.log("scrollEnd")
        container.removeEventListener("scroll", update);
        container.removeEventListener("scrollend", scrollEnd);
        container.addEventListener("scrollend", update);
    }

    update();

    for (let i = 0; i < header.children.length; i++) {
        header.children[i].addEventListener("click", function() {
            scrollTo(i);
        });
    }

    container.addEventListener("scroll", update);
    container.addEventListener("scrollend", scrollEnd);
});