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
        this.app.stage.addChild(mainScene);
        mainScene.create();
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    public create(completionCallback:Function):void
    {
        this.createApp().then(() => {
            this.createMainScene();
            completionCallback();
        });
    }

    public getStage():Container
    {
        return this.app.stage;
    }

    public resize(width:number, height:number):void
    {
        if(this.app.renderer)
        {
            this.app.renderer.resize(width, height);
        }
    }

}