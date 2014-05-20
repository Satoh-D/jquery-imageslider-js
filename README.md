jquery-imageslider-js
=====================

__Image Slider like "Ticker"__

ティッカーふうに左右に流れるタイプのイメージスライダーです。

## サンプル - Usage

```html
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="jquery.imageslider.js"></script>
<script>
$(function() {
	$('.js-imageslider').imageslider({
		slideItems: '.item',
		slideContainer: '.list',
		slideDistance: 5,
		slideDuratin: 800,
		resizable: true
	});
});
</script>
</head>
<body>
<div class="js-imageslider">
<ul class="list">
<li class="item"><img src="hoge.jpg" alt=""></li>
<li class="item"><img src="foo.jpg" alt=""></li>
<li class="item"><img src="bar.jpg" alt=""></li>
</ul>
<!-- /.js-imageslider --></div>
</body>
```

## オプション - Options

- slideItems: スライドさせる要素を指定します
- slideContainer: スライドさせる要素の親要素を指定します
- slideDistance: スライドする距離を指定します(px)
- slideDuration: スライドする速さを指定します(ms)
- resazable: 横幅の可変に対応します
