import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck

} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimation } from '../lib/scroll-animation';
gsap.registerPlugin(ScrollTrigger)


const WebgiViewer = forwardRef((props,ref)=>{
    const canvasRef = useRef(null);
    const [viewerRef ,setviewerRef] = useState(null)
    const [targetRef ,setTargetRef] = useState(null)
    const [cameraRef ,setCameraRef] = useState(null)
    const [positionRef ,setPositionRef] = useState(null)

    useImperativeHandle(ref , ()=>({
        triggerPreview(){
            gsap.to(positionRef,{
                x:13.04,
                y:-2.01,
                z:2.29,
                duration:2,
                onUpdate:()=>{
                    viewerRef.setDirty();
                    cameraRef.positionTargetUpdated(ture)
                }
            });

            gsap.to(targetRef,{
                x:0.11,
                y:0.0,
                z:0.0,
                duration:2
            });
        }
    }));

    const memorizedScrollAnimation = useCallback(
        (position , target , onUpdate)=>{
               if(position && target && onUpdate){
                scrollAnimation(position , target , onUpdate)
               }
        },[]
    )

    const setupViewer = useCallback(async () => {

 
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })

        const manager = await viewer.addPlugin(AssetManagerPlugin)
        
        //Using this property of position and target we will Animate 3d model
        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;


        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)

        viewer.renderer.refreshPipeline()

        // Import and add a GLB file.
        await manager.addFromPath("scene-black.glb")

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        
        //Rotation Off
        viewer.scene.activeCamera.setCameraOptions({controlsEnabled:false})
        
        window.scrollTo(0 , 0);

        let needsUpdate = true;

        const onUpdate = () =>{
            needsUpdate = true;
            viewer.setDirty();
        }

        viewer.addEventListener("preFrame" , ()=>{
            if(needsUpdate){
                camera.positionTargetUpdated(true);
                needsUpdate=false;
            }
        })

        memorizedScrollAnimation(position,target,onUpdate)
    }, [])
    
    useEffect(()=>{
        setupViewer()
    },[])


    return (
        <div id='webgi-canvas-container'>
            <canvas id='webgi-canvas' ref={canvasRef} />
        </div>
    )
}) 

export default WebgiViewer