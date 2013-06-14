var overLay = {}; 
overLay.config = {
	imgUrl:'img/bg.png',
	tip:''
}
overLay.show = function(){
	//判断是否已经有遮罩层
	if(document.getElementById('bgLayer')){//有遮罩层就显示遮罩
		//显示遮罩层
		document.getElementById('bgLayer').style.display = "block";
		//显示iframe
		document.getElementById('_testIframe').style.display = "block";
	}else{
		//没有遮罩成则创建遮罩层
		//获取浏览器窗口的宽度
		var width = document.documentElement.clientWidth;
		//获取浏览器窗口的高度
		var height = document.documentElement.clientHeight;
		//创建遮罩层DOM
		var bgLayer = document.createElement('div');
		//创建iframe DOM
		var iframe = document.createElement('iframe');
		//给iframe添加class
		iframe.className = 'testIframe';
		//给iframe添加id
		iframe.id = '_testIframe';
		//给遮罩层添加class
		bgLayer.className = 'bgLayer';
		//给遮罩层添加id
		bgLayer.id = 'bgLayer';
		//设置遮罩层的宽度
		bgLayer.style.width = width+'px';
		//设置遮罩层的高度
		bgLayer.style.height = height+'px';
		//设置iframe的宽度
		iframe.style.width = width+'px';
		//设置iframe的宽度
		iframe.style.height = height+'px';
		//加载图片的html
		var imgHtml = '<img alt="" src="'+overLay.config.imgUrl+'"/>';
		//加载提示信息
		var tipHtml = '<div style="width:80px;margin:0 auto"><span style="text-align:center;color:#fff">'+overLay.config.tip+'</span></div>'
		//弹出的加载层（图片加提示信息）
		var divAlert = '<div id="_tipLayer" class="_tipLayer">'+
						imgHtml+tipHtml+'</div>';
		//添加遮罩层html元素				
		bgLayer.innerHTML = divAlert;
		//var bd = window.parent.document.getElementsByTagName('body')[0];
		//获取body的DOM
		var bd = document.getElementsByTagName('body')[0];
		//var bd = document.documentElement;
		//向body中添加遮罩层
		bd.appendChild(bgLayer);
		//向body中添加iframe
		bd.appendChild(iframe);
		//获得弹出加载显示的DOM
		var tipLayer = document.getElementById('bgLayer').firstChild;
		//获取弹出加载显示宽度
		tipLayerWidth = tipLayer.clientWidth;
		//获取弹出加载显示高度
		tipLayerHeight = tipLayer.clientHeight;
		var left = (width-tipLayerWidth)/2;
		var top =  (height-tipLayerHeight)/2;
		//设置弹出加载显示的left值
		tipLayer.style.left = left+'px'; 
		//设置弹出加载显示的top值
		tipLayer.style.top = top+'px'; 
	}
}
overLay.hide = function(){
	//var r = document.getElementsByTagName('body')[0].lastChild;
	//document.getElementsByTagName('body')[0].removeChild(r);
	//隐藏遮罩
	document.getElementById('bgLayer').style.display = "none";
	//隐藏iframe
	document.getElementById('_testIframe').style.display = "none";
}