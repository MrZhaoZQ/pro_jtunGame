var iswechat = (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger');
var cloc = window.location.href.split("?")[0];
if(cloc.substring(cloc.length - 1) != "/") cloc += "/";

var sharefriendData = {
	title: "快来一起喂江豚宝宝！",
	desc: "快来一起喂江豚宝宝！",
	link: "",
	imgUrl: ""
};

var sharetimelineData = {
	title: "快来一起喂江豚宝宝！",
	desc: "快来一起喂江豚宝宝！",
	link: "",
	imgUrl: ""
};
var callbackShare = true;
var wxurl = location.href.split('#')[0];

function wxconfig(config, apilist) {
	if(!apilist) apilist = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
	if(config && config.appId && config.timestamp && config.nonceStr && config.signature) {
		wx.config({
			debug: false,
			appId: config.appId,
			timestamp: config.timestamp,
			nonceStr: config.nonceStr,
			signature: config.signature,
			jsApiList: apilist
		});
	}else{
		$.ajax({
			type: "POST",
			url: "https://dyson.fugumobile.cn/wx/wxjsconfig.ashx",  
			async: true,
			cache: false,
			dataType: "jsonp",
			data: {
				"url": wxurl
			},
			success: function(data) {
				if(data) {
					if(data.appId && data.timestamp && data.nonceStr && data.signature) {
						//console.log(data.appId + "_" + data.timestamp + "_" + data.nonceStr + "_" + data.signature)
						wx.config({
							debug: false,
							appId: data.appId,
							timestamp: data.timestamp,
							nonceStr: data.nonceStr,
							signature: data.signature,
							jsApiList: apilist
						});
					}
				}
			},
			error: function(xhr, msg, exc) {
				//alert("生成微信签名失败，请重试！");
			}
		});
	}
}

function wxevent(data1, data2) {
	if(!data1 || data1 == undefined || data1 == null) data1 = sharefriendData;
	if(!data2 || data2 == undefined || data2 == null) data2 = sharetimelineData;
	// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
	wx.onMenuShareAppMessage({
		title: sharefriendData.title,
		desc: sharefriendData.desc,
		link: sharefriendData.link,
		imgUrl: sharefriendData.imgUrl,
		trigger: function(res) {
			//alert('用户点击发送给朋友');
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		},
		success: function(res) {
			//_hmt.push(['_trackEvent', 'button', 'click', '分享到好友']);
			//alert('已分享');
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		},
		cancel: function(res) {
			//alert('已取消');
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		},
		fail: function(res) {
			//alert(JSON.stringify(res));
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		}
	});
	// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
	wx.onMenuShareTimeline({
		title: sharetimelineData.title,
		link: sharetimelineData.link,
		imgUrl: sharetimelineData.imgUrl,
		trigger: function(res) {
			//alert('用户点击分享到朋友圈');
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		},
		success: function(res) {
			// _hmt.push(['_trackEvent', 'button', 'click', '分享到朋友圈']);
			//alert('已分享');
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		},
		cancel: function(res) {
			//alert('已取消');
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		},
		fail: function(res) {
			//alert(JSON.stringify(res));
			//if (callbackShare && isFunction(shareCallback)) shareCallback();
		}
	});
}
wx.ready(function() {
	//window.alert("OK");
	wxevent();
});
wx.error(function(res) {
	//window.alert("NO");
	//falsealert(JSON.stringify(res));
	//config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

$(function() {
	if(iswechat) {
		wxconfig();
	}
});

function setwxshare(title, des, backlink, sharimg) {
	//console.log(title, des, backlink, sharimg);
	if(iswechat) {
		refreshShare(title, des, backlink, sharimg, title, des, backlink, sharimg);
	}
}

function refreshShare(friendtitle, frienddesc, friendurl, friendimg, timelinetitle, timelinedesc, timelineurl, timelineimg) {
	if(friendtitle) sharefriendData.title = friendtitle;
	if(frienddesc) sharefriendData.desc = frienddesc;
	if(friendurl) sharefriendData.link = friendurl;
	if(friendimg) sharefriendData.imgUrl = friendimg;

	if(timelinetitle) sharetimelineData.title = timelinetitle;
	if(timelinedesc) sharetimelineData.desc = timelinedesc;
	if(timelineurl) sharetimelineData.link = timelineurl;
	if(timelineimg) sharetimelineData.imgUrl = timelineimg;
	wxevent();
}