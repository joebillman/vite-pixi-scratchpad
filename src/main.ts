import MainController from "./controllers/MainController.ts";

let app:MainController;
let curWindowWidth = 0;
let defaultWidth = 1366;
let defaultHeight = 768;
let isHD = false;
let stage:any;

document.addEventListener('DOMContentLoaded', function ():void
{
    let body2 = {
        fontSize: "16px",
        fontWeight: "500",
    };
    let marginLeft24 = {
        marginLeft: "24px",
    };
    let combined  = {...body2, ...marginLeft24};

    debugger;
    console.log(Math.floor((window.outerWidth / window.innerWidth) * 100));
    createApp();
});

function captureCurrentDimensions():void
{
    curWindowWidth = screen.width < window.innerWidth ? screen.width : window.innerWidth;
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
    let padding = 0;
    let targetHeight = defaultHeight;
    let targetScale = 1;
    let targetWidth = defaultWidth;
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
    targetWidth = desiredWidth * targetScale;
    targetHeight = desiredHeight * targetScale;
    app.resize(targetWidth, targetHeight);
}