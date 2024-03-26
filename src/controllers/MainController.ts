import {Application, Container} from "pixi.js";
import MainScene from "../scenes/MainScene.ts";

export default class MainController
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private app:Application;
    private readonly canvasId:string;
    private stageContainer:Container;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(config:any)
    {
        this.canvasId = config.canvasId;
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private async createApp():Promise<void>
    {
        const pixiAppConfig = {
            antialias: true,
            background: '#000000',
            width: 1366,
            height: 768,
            canvas: document.getElementById(this.canvasId) as HTMLCanvasElement
        };
        this.app = new Application();
        await this.app.init(pixiAppConfig);
        //this.app.renderer.plugins.accessibility.debug = true;
    }

    private createMainScene():void
    {
        const mainScene = new MainScene();
        this.stageContainer.addChild(mainScene);
        mainScene.create();
    }

    private createStageContainer():void
    {
        this.stageContainer = new Container();
        this.stageContainer.pivot.set(0.5);
        this.app.stage.addChild(this.stageContainer);
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    public create(completionCallback:Function):void
    {
        this.createApp().then(() => {
            this.createStageContainer();
            this.createMainScene();
            completionCallback();
        });
    }

    public getStage():Container
    {
        return this.stageContainer;
    }

    public resizeRenderer(width:number, height:number):void
    {
        if(this.app.renderer)
        {
            this.app.renderer.resize(width, height);
        }
    }

}