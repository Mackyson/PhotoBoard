enchant();

window.onload = function () {
    var width = window.parent.screen.width;
    var height = window.parent.screen.height;
    //var spliteList = new ArrayList();

    var core = new Core(width,height);
    core.preload('bg.jpg');
    core.onload = function () {
        var bear = new Sprite(width,height);
        bear.image = core.assets['bg.jpg'];
        core.rootScene.addChild(bear);
    };
    core.start();
};