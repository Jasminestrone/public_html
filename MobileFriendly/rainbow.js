let angle=0;


function onFrame(){ 
    let angle2 = angle + 5;
    angle+=1
    document.body.style=
        "background:hsl(" + angle + "deg,100%,50%);--rotation:" + angle2 + "deg";
    requestAnimationFrame(onFrame)


}
onFrame()