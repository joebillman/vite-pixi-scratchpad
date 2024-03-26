import {Assets, Container, Sprite} from "pixi.js";

export default class MainScene extends Container
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private avatar:Sprite;
    private bg:Sprite;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor()
    {
        super();
        this._init();
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Private:
    //----------------------------------

    private _init()
    {
        this.label = "mainScene";
    }

    private createAvatar():void
    {
        this.avatar = Sprite.from("koala.png");
        this.avatar.anchor.set(0.5);
        this.avatar.x = 200;
        this.avatar.y = 200;
        this.addChild(this.avatar);
    }

    private createBg():void
    {
        this.bg = Sprite.from("mainBg");
        this.addChild(this.bg);
    }

    private async loadAssets():Promise<void>
    {
        const bundle:any = {
            mainBg:`assets/img/bg_main.png`,
            avatarsSpritesheet:`assets/spritesheets/avatars@1x_0.json`,
        };

        await Assets.init();
        Assets.addBundle("main-assets", bundle);
        await Assets.loadBundle('main-assets').then(() => {
            this.createBg();
            this.createAvatar();
        });
    }

    //----------------------------------
    //  Public:
    //----------------------------------

    public create():void
    {
        this.loadAssets().then(() => {
            console.log("MainScene created.");
        });
    }
}