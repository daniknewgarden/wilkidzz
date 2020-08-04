const menu = document.querySelector('.header__menu'),
    menuBtn = menu.querySelector('.menu__btn'),
    menuItems = document.querySelector('.menu__items'),
    menuList = menuItems.querySelector('.menu__list'),
    menuLinks = menuItems.querySelector('a[href^="#"]');

function toggleMenu() {
    menu.classList.toggle('menu-opened');
    setTimeout(() => {
        menuItems.classList.toggle('visible')
    }, 10);
}

function closeMenu() {
    console.log('menu closed')
}

console.log(menuBtn)

//Events
menuBtn.addEventListener('click', toggleMenu)