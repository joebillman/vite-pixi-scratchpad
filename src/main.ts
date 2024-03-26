import MainController from "./controllers/MainController.ts";

let app:MainController;
let curWindowWidth;
let curWindowHeight;
let defaultWidth = 1366;
let defaultHeight = 768;
let isHD = false;
let stage:any;

document.addEventListener('DOMContentLoaded', function ():void
{
    createApp();
});

function captureCurrentDimensions():void
{
    curWindowWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth;
    curWindowHeight = screen.height < window.innerHeight ? screen.height : window.innerHeight;
}

function createApp():void
{
    app = new MainController({canvasId:"pixi-canvas"});
    app.create(onAppCreationComplete);
}

function handleResize()
{
    resize();
}

function onAppCreationComplete():void
{
    stage = app.getStage();
    window.addEventListener('resize', handleResize, false);
    resize();
}

function resize()
{
    captureCurrentDimensions();
    let desiredWidth = (isHD) ? defaultWidth*2 : defaultWidth;
    let desiredHeight = (isHD) ? defaultHeight*2 : defaultHeight;
    let headerAndFooterHeightTotal = 0;
    let padding = 0;
    let targetHeight = defaultHeight;
    let targetScale = 1;
    let targetWidth = defaultWidth
    let usableHeight = curWindowHeight - headerAndFooterHeightTotal - padding;
    let usableWidth = curWindowWidth - padding;

    targetScale = usableWidth / desiredWidth;
    if(targetScale > 1)
    {
        targetScale = 1;
    }
    if(targetScale <= 0)
    {
        targetScale = .001;
    }
    stage.scale.set(targetScale);

    targetHeight = desiredHeight * targetScale;
    if(targetHeight > usableHeight)
    {
        targetScale = usableHeight / desiredHeight;
    }
    if(targetScale > 1)
    {
        targetScale = 1;
    }
    if(targetScale <= 0)
    {
        targetScale = .001;
    }
    targetWidth = desiredWidth * targetScale;
    targetHeight = desiredHeight * targetScale;
    stage.resizeRenderer(targetWidth, targetHeight);
    stage.scale.set(targetScale);
    document.getElementById("pixi-canvas").setAttribute("width", targetWidth.toString());
    document.getElementById("pixi-canvas").setAttribute("height", targetHeight.toString());
    //document.getElementById("pixi-canvas").style.width = targetWidth.toString() + "px";
}