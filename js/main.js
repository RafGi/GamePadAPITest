/**
 * Created by rafgi on 17/10/2018.
 */
function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
    html += "id: " + gp.id + "<br/>";

    for (var i = 0; i < gp.buttons.length; i++) {
        html += "Button " + (i + 1) + ": ";
        if (gp.buttons[i].pressed) {
            var tempbutton = gp.buttons[i];

            switch (tempbutton) {
                case gp.buttons[0]:
                    html += " Activate hero power";
                    break;
                case gp.buttons[1]:
                    html += " Activate line streak";
                    break;
                case gp.buttons[12]:
                    html += " Turn tetris block";
                    break;
                case gp.buttons[13]:
                    html += " Tetris block moves down";
                    break;
                case gp.buttons[14]:
                    html += " Tetris block moves left";
                    break;
                case gp.buttons[15]:
                    html += " Tetris block moves right";
                    break;
                default:
                    html+= " Do nothing";
                    break;
            }
        }

        html += "<br/>";
    }

    for (var i = 0; i < gp.axes.length; i += 2) {
        html += "Stick " + (Math.ceil(i / 2) + 1) + ": " + gp.axes[i] + "," + gp.axes[i + 1] + "<br/>";
    }

    $("#gamepadDisplay").html(html);
}

$(document).ready(function () {

    if (canGame()) {

        var prompt = "To begin using your gamepad, connect it and press any button!";
        $("#gamepadPrompt").text(prompt);

        $(window).on("gamepadconnected", function () {
            hasGP = true;
            $("#gamepadPrompt").html("Gamepad connected!");
            console.log("connection event");
            repGP = window.setInterval(reportOnGamepad, 100);
        });

        $(window).on("gamepaddisconnected", function () {
            console.log("disconnection event");
            $("#gamepadPrompt").text(prompt);
            window.clearInterval(repGP);
        });

        //setup an interval for Chrome
        /*var checkGP = window.setInterval(function() {
         console.log('checkGP');
         if(navigator.getGamepads()[0]) {
         if(!hasGP) $(window).trigger("gamepadconnected");
         window.clearInterval(checkGP);
         }
         }, 500);*/
    }

});



