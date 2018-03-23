enchant();

window.onload = function () {
    var width = window.parent.screen.width;
    var height = window.parent.screen.height;

    var core = new Core(width, height);
    core.fps = 15;
    core.preload('bg.jpg');
    core.onload = function () {

        var spriteList = new Array();
        var cnt = 0;
        var isButtonDown = false;//denied keep pushing

        var bg = new Sprite(width, height);
        bg.image = core.assets['bg.jpg'];


        core.rootScene.addChild(bg);
        core.rootScene.addChild(new Label("Hello!:" + cnt + "\n spriteNumber" + spriteList.length));

        core.addEventListener("enterframe", function () {

 


            if (core.input.left && !isButtonDown) {
                cnt--;
                isButtonDown = true;
            }
            if (core.input.right && !isButtonDown) {
                cnt++;
                isButtonDown = true;
            }
            if (core.input.up && !isButtonDown) {
                core.load("../submit/upload/" + cnt + ".jpg", function () {
                    var tmp = new Sprite(500, 500);
                    tmp.image = core.assets["../submit/upload/" + cnt + ".jpg"];
                    spriteList.push(tmp);
                    core.rootScene.addChild(spriteList[cnt++]);
                });

                isButtonDown = true;
            }
            if (!core.input.left && !core.input.right && !core.input.up && isButtonDown) { isButtonDown = false; }

    });
};
core.start();
};
