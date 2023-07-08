import { gsap } from "gsap";

export const scrollAnimation = (position , target , onUpdate)=>{
    const ti = gsap.timeline();

    ti.to(position,{
        x:-3.38,
        y:-10.74,
        z:-5.93,
        scrollTrigger:{
            trigger:'.sound-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{
        x:1.52,
        y:0.77,
        z:-1.08,
        scrollTrigger:{
            trigger:'.sound-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
    })
    .to('.jumbotron-section',{
        opacity:0,
        scrollTrigger:{
            trigger:'.sound-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
    })
    .to('.sound-section-content',{
        opacity:1,
        scrollTrigger:{
            trigger:'.sound-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
    })
    .to(position,{
        x:1.56,
        y:5.0,
        z:0.01,
        scrollTrigger:{
            trigger:'.display-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{
        x:-0.55,
        y:0.32,
        z:0.0,
        scrollTrigger:{
            trigger:'.display-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
    })
    .to('.display-section',{
        opacity:1,
        scrollTrigger:{
            trigger:'.display-section',
            start:'top bottom', // trigger the animation when model reaches to the top of sound-section
            end:'top top', //here the top of sound-section reaches to the top of viewport then end the animation
            scrub:2,
            immediateRender:false
        },
    })
}