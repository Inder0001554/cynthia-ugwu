const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

var timeout;

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}
circleMouseFollower();

function circleChaptaKaro(){
    //define default scale value 
    var xscale =1;
    var yscale =1;

    var xprevious = 0;
    var yprevious = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout)
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprevious);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientX - yprevious);

        xprevious = dets.clientX;
        yprevious = dets.clientY;

        circleMouseFollower(xscale, yscale)
        timeout = setTimeout(function(){
            document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100)

    })
}
circleChaptaKaro();


function firstPageAnimate(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y:'-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".bounding-elem", {
            y: 0,
            duration: 2,
            stagger: .2,
            delay: -1,
            ease: Expo.easeInOut,
        })
        .from("#hero-footer", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        })
}
firstPageAnimate();

document.querySelectorAll(".elem").forEach(function (elem) {
     var rotate = 0;
     var diffrotate = 0;
    
    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrotate = dets.clientX - rotate;
        rotate = dets.clientX;
        var img = elem.querySelector("img");

        gsap.to(img, {
            opacity: 1,
            ease: Power3,
            duration: 0.5,
            top: diff - img.offsetHeight / 2,
            left: dets.clientX - img.offsetWidth / 2,
            rotate: gsap.utils.clamp(-20, 20, diffrotate) 
        });
    });

    elem.addEventListener("mouseleave", function () {
        var img = elem.querySelector("img");
        gsap.to(img, {
            opacity: 0
        });
    });
});