(function($) {
    var _slotMachine,
        _indexObj = {};
    $(function() {
        init();
        setButton();
    });

    function init() {
        _slotMachine = new SlotMachine($('.slot-machine .s-l ul'), { callback: slotMachineCallback });

    }

    function setButton() {
        $('.slot-handle, .slot-txt').on('click', function(e) {
            e.preventDefault();
            gameStart();
        });
    }

    function gameStart() {
        if (_indexObj.gameBol) return;
        if (_indexObj.chanceNum == 0) {
            window.alert('您已經沒有抽獎機會！')
            return;
        }
        _indexObj.gameBol = true;
        delete _indexObj.lightBol;
        // lightFlash();
        // Fun.eleFadeOut($('.slot-txt'));
        // $('.slot-handle').addClass('active');
        // TweenMax.delayedCall(0.2, function() { $('.slot-handle').removeClass('active') })
        getGift();
    }

    function slotMachineCallback() {

    }


    /*
	
     */
    function getGift(pObj) {
        /*Fun.loadingChange(true);
        $.post("抽獎API", pObj, function(data){
            Fun.loadingChange(false);
            if(data.result){
                _slotMachine.startAction();
                _indexObj.gift = paserInt(data.gift);
                _indexObj.chanceNum = paserInt(data.chanceNum);
                _slotMachine.stopAction(_indexObj.gift - 1));
                setChance();
            }else{
                delete _indexObj.gameBol;
                alert(data.msg);
            }
        }, 'json');*/
        _indexObj.chanceNum--;
        _slotMachine.startAction();
        _indexObj.gift = parseInt(Math.random() * 6);
        _slotMachine.stopAction(7);
        //setChance();
    }

})(jQuery);
var canvas, stage, exportRoot;