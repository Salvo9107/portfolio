console.log('JS IS READY!');

const bodyEl = document.querySelector('body');
console.log(bodyEl);
const menuIcon = document.querySelector('.bx-menu');
console.log(menuIcon);
const xIcon = document.querySelector('.bx-x');
console.log(xIcon);
const navLinksEl = document.querySelector('.navbar .nav-links');
console.log(navLinksEl);
const arrowProjx = document.querySelector('.links .projx-arrow');
console.log(arrowProjx);
const projxLinkEl = document.querySelector('.links li.sub-menu-projx .links-header > a');
console.log(projxLinkEl);
const projxSubmenuEl = document.querySelector('.links .sub-menu-projx-ul');
console.log(projxSubmenuEl);

// menuIcon.addEventListener('click', ()=>{
//     console.log('menu Icon clicked');
//     navLinksEl.style.left = '0px';

//     menuIcon.style.visibility = 'hidden';
// });

// xIcon.addEventListener('click', ()=>{
//     console.log('x Icon clicked');
//     navLinksEl.style.left = '100%';
//     menuIcon.style.visibility = 'visible';
// });

menuIcon.addEventListener('click', ()=> {
    navLinksEl.classList.toggle('show-sidebar');
});

projxLinkEl.addEventListener('click', ()=>{
    console.log('Projx-link clicked');
    arrowProjx.classList.toggle('arrow-point-down');
    navLinksEl.classList.toggle('show-list');
});

arrowProjx.addEventListener('click', ()=>{
    console.log('Projx-arrow clicked');
    arrowProjx.classList.toggle('arrow-point-down');
    navLinksEl.classList.toggle('show-list');
});


