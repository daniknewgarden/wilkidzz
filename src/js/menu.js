const header = document.querySelector('.header'),
    menu = document.querySelector('.header__menu'),
    menuBtn = menu.querySelector('.menu__btn'),
    menuItems = document.querySelector('.menu__items'),
    menuLinks = document.querySelectorAll(`a[href^='#']`),
    firstScreen = document.querySelector('.welcome');

const toggleMenu = () => {
    menu.classList.toggle('menu-opened');
    setTimeout(() => {
        menuItems.classList.toggle('visible')
    }, 10);
    //Lock scroll when menu is opened (not working on IOS devices)
    document.body.classList.toggle('scroll-lock');
}

const closeMenu = () => {
    menu.classList.remove('menu-opened');
    menuItems.classList.remove('visible')
    //Unlock scroll when menu is opened (not working on IOS devices)
    document.body.classList.remove('scroll-lock');
}

//Add box-shadow when scrolled after first-screen
const addShadow = (height) => {

    //Check distance to top
    if (pageYOffset > height) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }

}

//Scroll to element when touching a menu link
function scrollToElement(e) {
    e.preventDefault();
    const targetID = this.getAttribute("href"),
        targetAnchor = document.querySelector(targetID);

    if (!targetAnchor) {
        return;
    }

    closeMenu();
    targetAnchor.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


//Events listeners

//click
menuLinks.forEach(each => (each.onclick = scrollToElement));
menuBtn.addEventListener('click', toggleMenu)

//window scroll
window.addEventListener('scroll', (height) => {
    height = firstScreen.offsetHeight;

    addShadow(height)
})

//window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1424) {
        closeMenu();
    }
});