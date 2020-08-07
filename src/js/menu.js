import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock';

const menu = document.querySelector('.header__menu'),
    menuBtn = menu.querySelector('.menu__btn'),
    menuItems = document.querySelector('.menu__items'),
    menuLinks = document.querySelectorAll('a[href^="#"]');

function toggleMenu() {
    menu.classList.toggle('menu-opened');
    setTimeout(() => {
        menuItems.classList.toggle('visible')
    }, 10);
    //Lock scroll when menu is opened (not working on IOS devices)
    document.body.classList.toggle('scroll-lock');
}

function closeMenu() {
    menu.classList.remove('menu-opened');
    menuItems.classList.remove('visible')
    //Unlock scroll when menu is opened (not working on IOS devices)
    document.body.classList.remove('scroll-lock');
}

//Scroll to element when touching a menu link
function scrollToElement(e) {
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


//Events
menuLinks.forEach(each => (each.onclick = scrollToElement));
menuBtn.addEventListener('click', toggleMenu)