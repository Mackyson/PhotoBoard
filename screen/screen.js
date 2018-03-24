enchant();

window.onload = function () {

    var screenWidth = window.parent.screen.width;
    var screenHeight = window.parent.screen.height;
    var FRAME_RATE = 30;
    var isAnimating = false;

    function anime(sprite, sizeX, sizeY) {
        isAnimating = true;
        var x = Math.floor(Math.random() * (screenWidth - sizeX)), y = Math.floor(Math.random() * (screenHeight - sizeY));;

        sprite.tl.moveTo((screenWidth - sizeX) / 2, (screenHeight - sizeY) / 2, FRAME_RATE / 2)//画像が下からグイっとパンして
            .delay(FRAME_RATE * 1.5)//送った画像がドーン
            .moveTo((screenWidth - sizeX) / 2, -sizeY, FRAME_RATE);//上へ飛ぶ
        sprite.tl.scaleTo(0.5, 0.5, 1);
        sprite.tl.moveTo(x, y, FRAME_RATE * 2).then(function () { isAnimating = false; });
    }

    var core = new Core(screenWidth, screenHeight);
    core.fps = FRAME_RATE;
    core.preload('bg.jpg');
    core.onload = function () {

        var spriteList = new Array();
        var cnt = 0;
        var isButtonDown = false;//denied keep pushing

        var bg = new Sprite(screenWidth, screenHeight);
        bg.image = core.assets['bg.jpg'];


        core.rootScene.addChild(bg);

        core.addEventListener("enterframe", function () {



            if (core.input.left && !isButtonDown && !isAnimating) {
                if (cnt > 0) cnt--;
                isButtonDown = true;
            }
            if (core.input.right && !isButtonDown && !isAnimating) {
                cnt++;
                isButtonDown = true;
            }
            if (core.input.up && !isButtonDown && !isAnimating) {
                core.load("../submit/upload/" + cnt + ".jpg", function () {

                    var img = new Image();
                    img.src = "../submit/upload/" + cnt + ".jpg";

                    var tmp = new Sprite(img.width, img.height);
                    tmp.image = core.assets["../submit/upload/" + cnt + ".jpg"];
                    tmp.x = (screenWidth - img.width) / 2;
                    tmp.y = screenHeight + 1000;

                    spriteList.push(tmp);
                    core.rootScene.addChild(spriteList[cnt]);

                    anime(spriteList[cnt++], img.width, img.height);
                });

                isButtonDown = true;
            }
            if (core.input.down && !isButtonDown) {
                core.rootScene.removeChild(spriteList[--cnt]);
                spriteList.splice(cnt, 1);
                isAnimating = false;
                isButtonDown = true;
            }
            if (!core.input.left && !core.input.right && !core.input.up && !core.input.down && isButtonDown) { isButtonDown = false; }
            counter.text = "picture id: " + (cnt <= 0 ? "no picture" : cnt - 1);
        });

        var counter = new Label();
        core.rootScene.addChild(counter);
    };
    core.start();
};
