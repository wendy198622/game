/* 91APP Inc.遊戲產生器91APP All rights reserved. */
$(function(){
	var url = window.location.href;
	var share_fb = 'http://www.facebook.com/sharer.php';
	$('.share_fb').attr('href',share_fb+'?u='+url);
	var share_line = 'http://line.naver.jp/R/msg/text/';
	$('.share_line').attr('href',share_line+'?'+url);
});

$(function(){
	var GAME = new Array();
		GAME[0] =  "game00";
					// ↑無意義_只是方便記順序
		GAME[1] =  "game01";
					// ↑獎項_01
		GAME[2] =  "game02";
					// ↑獎項_02
		GAME[3] =  "game03";
					// ↑獎項_03
		GAME[4] =  "game04";
					// ↑獎項_04
		GAME[5] =  "game05";
					// ↑獎項_05
		GAME[6] =  "game06";
					// ↑獎項_06
		GAME[7] =  "game07";
					// ↑獎項_07
		GAME[8] =  "game08";
					// ↑獎項_08

	var PRIZE = new Array();
		PRIZE[0] =  "";
					// ↑無意義_只是方便記順序
		PRIZE[1] =  ".rwd_outer .prize_outer.prize_num";
					// ↑獎項彈跳視窗_序號式
		PRIZE[2] =  ".rwd_outer .prize_outer.prize_link";
					// ↑獎項彈跳視窗_連結式
		PRIZE[3] =  ".rwd_outer .prize_outer.prize_none";
					// ↑獎項彈跳視窗_銘謝惠顧

	var ERRO = new Array();
		ERRO[0] =  "";
					// ↑可玩
		ERRO[1] =  ".rwd_outer .prize_outer.prize_pop1";
					// ↑不可玩_活動結束
		ERRO[2] =  ".rwd_outer .prize_outer.prize_pop2";
					// ↑不可玩_今日已玩三次

	// ↓點START後 遊戲結果控制	
	$(".game_outer ul li:nth-child(4)").click(function(){
		var gift = do_lottery();
		var id = gift.id;
		var type = 0;
		if(gift.type == 'code'){
			type = 1;
		}else if(gift.type == 'link'){
			type = 2;
		}
		show_result(gift);
		
		$(".game_outer ul li:nth-child(1) img").addClass(GAME[id]);
		// ↑後端依機率餵 獎項 陣列號碼
		$(".game_outer ul li:nth-child(2)").addClass('gameshine');
		// ↑得獎後閃爍
		$(PRIZE[type]).delay(3500).fadeIn(300);
		// ↑後端依機率餵 獎項彈跳視窗 陣列號碼
	});

	// 複製序號
	$(".copybtn").click(function() {
		var name = $(this).attr('name');
		var el = document.getElementById(name);
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
		document.execCommand('copy');
		//alert("已複製序號");
		$(".copyouter").fadeIn(300).delay(800).fadeOut(300);
		return false;
	});

	// 點擊X關閉提醒視窗
	$(".prize_pop2 i a").click(function(e){
		e.preventDefault();
		$(".prize_pop2").hide();
		$(".game_outer ul").append("<li></li>");
		$(".game_outer ul li:nth-child(5)").css({
		"width":"100%",
		"height":"100%",
		});
	});	


	// 點擊X與再玩一次後_刷新頁面
	$(".prize_num i a, .prize_link i a, .prize_outer div div a:nth-child(2)").click(function(e){
		e.preventDefault();
		location.reload();
	});	

	if(time_check()){
		$(ERRO[2]).fadeOut(0);
		$(ERRO[1]).fadeIn(300);
	}
    
	var remaining = count_check();
    if(remaining<=0){
    	// ↓每日超出次數_就顯示提醒視窗 
    	$(ERRO[2]).fadeIn(300);
    }else {
    	$(ERRO[0]).fadeIn(300);
    }
    
	if((remaining-1)>0){
		$(".playcount").html("還剩"+ (remaining-1)  + "次機會");
	}else{
		$(".playcount").html('每日限玩'+total_of_day+'次，下次請早喔');
	}
    
	$(".today_played").html('每日限玩'+total_of_day+'次<br/>下次請早喔');

});

/**
 * Cookie 到期日，次日00:00:00
 */
var currentDate    = new Date();
var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);

function set_count(){
	var _count = get_count();
	_count++;
    $.cookie("count_"+path, _count ,{ expires: expirationDate } );
}

function get_count(){
	var _count = $.cookie("count_"+path);
	if( !_count){
		$.cookie("count_"+path, 0    ,{ expires: expirationDate });
	}
	return _count;
}

function time_check(){
	var NOWYEAR = moment().format('YYYY');
	var NOWMONTH = moment().format('MM');
	var NOWDATE = moment().format('DD');
	var NOWHOUR = moment().format('HH');
	var NOWMIN = moment().format('mm');
	var AAA = moment([NOWYEAR, NOWMONTH, NOWDATE, NOWHOUR, NOWMIN]);
	var NOW = moment();
	var BBB = moment(end_date); //遊戲截止_年,月,日,時,分
	//var FINALCOUNT = AAA.diff(BBB, 'minutes');
	var FINALCOUNT = parseInt(NOW-BBB);
	if( FINALCOUNT > 0 ){
		return true;
	}else{
		return false;
	}
}

function count_check(){
	var _count    = get_count();
	var remaining = total_of_day - _count;
	if(remaining>0){
    	return remaining;
    }else {
    	return 0;
    }
}	var start_date   = "";
    var end_date     = "2020-02-20";
	var total_of_day = 1000;
    var gift         = {"1":{"type":"link","chance":"10","title":"111","code":"","link":"http:\/\/www.yahoo.com"},"2":{"type":"link","chance":"10","title":"222","code":"","link":"http:\/\/www.google.com"},"3":{"type":"link","chance":"10","title":"333","code":"","link":"http:\/\/www.yahoo.com"},"4":{"type":"link","chance":"10","title":"444","code":"","link":"http:\/\/www.yahoo.com"},"5":{"type":"link","chance":"10","title":"555","code":"","link":"http:\/\/www.yahoo.com"},"6":{"type":"link","chance":"10","title":"666","code":"","link":"http:\/\/www.yahoo.com"},"7":{"type":"link","chance":"10","title":"777","code":"","link":"http:\/\/www.yahoo.com"},"8":{"type":"link","chance":"30","title":"888","code":"","link":"http:\/\/www.yahoo.com"}};
    var lottery      = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1,"11":2,"12":2,"13":2,"14":2,"15":2,"16":2,"17":2,"18":2,"19":2,"20":2,"21":3,"22":3,"23":3,"24":3,"25":3,"26":3,"27":3,"28":3,"29":3,"30":3,"31":4,"32":4,"33":4,"34":4,"35":4,"36":4,"37":4,"38":4,"39":4,"40":4,"41":5,"42":5,"43":5,"44":5,"45":5,"46":5,"47":5,"48":5,"49":5,"50":5,"51":6,"52":6,"53":6,"54":6,"55":6,"56":6,"57":6,"58":6,"59":6,"60":6,"61":7,"62":7,"63":7,"64":7,"65":7,"66":7,"67":7,"68":7,"69":7,"70":7,"71":8,"72":8,"73":8,"74":8,"75":8,"76":8,"77":8,"78":8,"79":8,"80":8,"81":8,"82":8,"83":8,"84":8,"85":8,"86":8,"87":8,"88":8,"89":8,"90":8,"91":8,"92":8,"93":8,"94":8,"95":8,"96":8,"97":8,"98":8,"99":8,"100":8};
    var path         = "20200219123456";

    function get_random(){
		return Math.floor((Math.random()*100) + 1); 
	}
    
	function do_lottery(){
		var num = get_random();
		var key = lottery[num];
		var now_gift = gift[key];
		now_gift.id = key;
		return now_gift;
	}
	
	function show_result(gift){
		$('.gift_title').text(gift.title);
		$('.gift_code').text(gift.code);
		$('.gift_link').attr('href',gift.link);
		set_count();
		//console.log(gift);
	}
    