/**
本代码为RecordApp在uni-app下使用的适配代码，为压缩版（功能和源码版一致）
GitHub、详细文档、许可及服务协议: https://github.com/xiangyuecn/Recorder/tree/master/app-support-sample/demo_UniApp

【授权】
在uni-app中编译到App平台时仅供测试用（App平台包括：Android App、iOS App），不可用于正式发布或商用，正式发布或商用需先联系作者获取到商用授权许可

在uni-app中编译到其他平台时无此授权限制，比如：H5、小程序，均为免费授权

获取商用授权方式：到DCloud插件市场购买授权 https://ext.dcloud.net.cn/plugin?name=Recorder-NativePlugin-Android （会赠送Android版原生插件）；购买后可联系客服，同时提供订单信息，客服拉你进入VIP支持QQ群，入群后在群文件中可下载此js文件最新源码

客服联系方式：QQ 1251654593 ，或者直接联系作者QQ 753610399 （回复可能没有客服及时）。
**/

/***
录音 RecordApp: uni-app支持文件，支持 H5、App vue、App nvue、微信小程序
GitHub、详细文档、许可及服务协议: https://github.com/xiangyuecn/Recorder/tree/master/app-support-sample/demo_UniApp

DCloud插件地址：https://ext.dcloud.net.cn/plugin?name=Recorder-UniCore
App配套原生插件：https://ext.dcloud.net.cn/plugin?name=Recorder-NativePlugin

全局配置参数：
	RecordApp.UniAppUseLicense:"" App中使用的授权许可，获得授权后请赋值为"我已获得UniAppID=***的商用授权"（***为你项目的uni-app应用标识），设置了UniNativeUtsPlugin时默认为已授权；如果未授权，将会在App打开后第一次调用`RecordApp.RequestPermission`请求录音权限时，弹出“未获得商用授权时，App上仅供测试”提示框。
	
	RecordApp.UniNativeUtsPlugin:null App中启用原生录音插件或uts插件，由App提供原生录音，将原生插件或uts插件赋值给这个变量即可开启支持；使用原生录音插件只需赋值为{nativePlugin:true}即可（提供nativePluginName可指定插件名字，默认为Recorder-NativePlugin），使用uts插件只需import插件后赋值即可（uts插件还未开发，目前不可集成）；如果未提供任何插件，App中将使用H5录音（在renderjs中提供H5录音）。
	
	RecordApp.UniWithoutAppRenderjs:false 不要使用或没有renderjs时，应当设为true，此时App中RecordApp完全运行在逻辑层，比如nvue页面，此时音频编码之类的操作全部在逻辑层，需要提供UniNativeUtsPlugin配置由原生插件进行录音，可视化绘制依旧可以在renderjs中进行。默认为false，RecordApp将在renderjs中进行实际的工作，然后将处理好的数据传回逻辑层，数据比较大时传输会比较慢。

不同平台环境下使用说明：
	【H5】 引入RecordApp和本js，按RecordApp的文档使用即可，和普通网页开发没有区别

	【微信小程序】 引入RecordApp和本js，同时引入RecordApp中的app-miniProgram-wx-support.js即可，录音操作和H5完全相同，其他可视化扩展等使用请参考RecordApp中的小程序说明
	
	【App vue】 引入RecordApp和本js，并创建一个<script module="xxx" lang="renderjs">，在renderjs中也引入RecordApp和本js，录音操作和H5大部分相同，部分回调需要多编写一个renderjs的处理代码，比如onProcess_renderjs，具体的请参考RecordApp文档中的app-support-sample/demo_UniApp文档
	
	【App nvue】 引入RecordApp和本js，配置RecordApp.UniWithoutAppRenderjs=true 和提供RecordApp.UniNativeUtsPlugin，录音操作和H5完全相同，但不支持可视化扩展
***/
!function(e){var n="object"==typeof window&&!!window.document,t=n?window:Object,i="https://github.com/xiangyuecn/Recorder/tree/master/app-support-sample/demo_UniApp";if(t.RecordApp){var r=t.Recorder,a=r.i18n;!function(m,S,e,y,C){"use strict";var W=S.RecordApp,h=W.CLog,B=function(){};W.UniSupportLM="2024-04-09 19:56";var P="app-uni-support.js",V=!1,M=!1,I=!1,j=!1,N=!1;(function(){/* #ifdef APP */if(C){V=!0;var e=navigator.userAgent.replace(/[_\d]/g," ");M=!/\bandroid\b/i.test(e)&&/\bios\b|\biphone\b/i.test(e)}else"object"==typeof plus&&("Android"==plus.os.name?V=!0:"iOS"==plus.os.name&&(M=V=!0)),(I=V)||h("App !plus",1)/* #endif */})(),V||((function(){/* #ifdef H5 */j=!0/* #endif */})(),(function(){/* #ifdef MP-WEIXIN */N=!0/* #endif */})());W.UniIsApp=function(){return V?M?2:1:0};var T=W.UniBtoa=function(e){if("object"==typeof uni&&uni.arrayBufferToBase64)return uni.arrayBufferToBase64(e);for(var n=new Uint8Array(e),t="",i=0,r=n.length;i<r;i++)t+=String.fromCharCode(n[i]);return btoa(t)},k=W.UniAtob=function(e){if("object"==typeof uni&&uni.base64ToArrayBuffer)return uni.base64ToArrayBuffer(e);for(var n=atob(e),t=new Uint8Array(n.length),i=0,r=n.length;i<r;i++)t[i]=n.charCodeAt(i);return t.buffer};W.UniB64Enc=function(e){if("object"==typeof uni&&uni.arrayBufferToBase64){var n=W.UniStr2Buf(e);return uni.arrayBufferToBase64(n)}return btoa(unescape(encodeURIComponent(e)))},W.UniB64Dec=function(e){if("object"==typeof uni&&uni.base64ToArrayBuffer){var n=uni.base64ToArrayBuffer(e);return W.UniBuf2Str(n)}return decodeURIComponent(escape(atob(e)))},W.UniStr2Buf=function(e){for(var n=unescape(encodeURIComponent(e)),t=new Uint8Array(n.length),i=0,r=n.length;i<r;i++)t[i]=n.charCodeAt(i);return t.buffer},W.UniBuf2Str=function(e){for(var n=new Uint8Array(e),t="",i=0,r=n.length;i<r;i++)t+=String.fromCharCode(n[i]);return decodeURIComponent(escape(t))};var E=W.UniJsSource={IsSource:!1,pcm_sum:function(e){for(var n=0,t=0;t<e.length;t++)n+=Math.abs(e[t]);return n}};(function(initMemory){!function(){var f=A;!function(e,t){for(var n=A,r=F();;)try{if(209066===-parseInt(n(531))/1*(parseInt(n(256))/2)+-parseInt(n(178))/3+-parseInt(n(195))/4+-parseInt(n(226))/5*(parseInt(n(334))/6)+parseInt(n(365))/7*(parseInt(n(205))/8)+parseInt(n(459))/9+-parseInt(n(161))/10*(-parseInt(n(225))/11))break;r.push(r.shift())}catch(e){r.push(r.shift())}}();var o={Support:function(e){var t=A;return N?(W[t(287)][t(300)]||h(y(t(275),0,t(529)),1),void e(!1)):j?void e(!1):V?void(!C||W[t(378)]?e(!0):e(!1)):(h(y(t(242)),3),void e(!1))},CanProcess:function(){return!0}};W[f(393)](C?f(327):f(351),o),V&&(h[f(427)]=C?f(440):f(134)),W[f(532)]||(W[f(532)]={id:0,pageShow:{}});var v=function(){return V&&!C&&!W[f(375)]};function A(e,t){var n=F();return(A=function(e,t){return n[e-=125]})(e,t)}W[f(362)]=function(e){var t=f,n=W[t(532)][t(271)]={};if(N&&W[t(377)]&&W[t(377)](),v()){n[t(324)]=l(e);var r=W[t(274)];if(r){for(var i=getCurrentPages(),a=!0,o=0,c=i[t(162)];o<c;o++)if(i[o][t(156)].id==r){a=!1;break}a&&(W[t(411)]=null,W[t(274)]=null,W[t(524)]=null)}}},W[f(262)]=function(e){var t=f;if(v()){W[t(289)]=!0,W[t(333)]=1,setTimeout(function(){W[t(333)]=0});var n=e[t(299)];if(n&&n[t(422)]&&n[t(422)][t(325)]){var r=e[t(236)]||e.$&&e.$[t(442)],i=c(e);i&&r?(r==W[t(411)]&&i==W[t(274)]||h(y(t(490))+t(165)+i+t(474)+r),W[t(411)]=r,W[t(274)]!=i&&(W[t(274)]=i,W[t(524)]=n[t(422)][t(325)]())):h(y(t(290))+t(439),1)}else h(y(t(199)),1)}},W[f(526)]=function(e){var t=f;if(V&&C){if(e[t(306)])var n=window[t(523)],r=e[t(236)]||e[t(306)][t(424)][t(151)],i=e[t(306)][t(479)];if(i)if(i[t(307)]=e,n&&r){var a=t(357)+n+t(474)+r;W[t(288)]=a,i[t(260)](t(517),a),W[t(532)][a]?h(y(t(410))+t(254)+a,3):(W[t(532)][a]=1,h(y(t(251))+t(407)+a))}else h(y(t(244))+t(439),1);else h(y(t(444)),1)}};var l=function(e,t,n){var r=f;if(e){if(e[r(168)])return e[r(168)];var i=c(e),a=e[r(236)]||e.$&&e.$[r(442)]}if(t)if(n||w(),r(266)==t)i=W[r(416)],a=W[r(346)];else i=W[r(274)],a=W[r(411)];return i&&a?r(357)+i+r(474)+a:""},R=function(e){var t=f;return t(258)===e||t(266)===e?{Rec_WvCid:l(null,e)}:{Rec_WvCid:e||"?"}},c=function(e){var t=f,n=e[t(299)];return(n=n&&n[t(156)])&&n.id||0},w=function(e){var t=f;if(!W[t(524)])return y(t(332));var n=l(null,1,1),r=W[t(532)][t(271)][t(324)];if(e){if(!W[t(416)])return y(t(412));if(l(null,t(266),1)!=n)return y(t(194))}return r&&r!=n&&h(y(t(432),0,r,n),3),""};W[f(273)]=function(e,i,a){var s=f,t="";t||I||(t=y(s(504)));var o=!t&&function(e,t){var n=s;if(e&&e[n(168)])var r=/^wv_(\d+)_/[n(347)](e[n(168)]),i=r&&r[1];else{var a=e&&e[n(299)],o=a&&a[n(422)];i=(a=a&&a[n(156)])&&a.id}if(i){if(i==W[n(274)])return W[n(524)];if(o)return o[n(325)]();var c=plus[n(344)][n(502)](i);if(c)return c}return t?(w(),W[n(524)]):null}(e,null==e);if(t||o||(t=y(s(null==e?506:402))),t)return t+=y(s(311)),h(t+s(188)+i[s(429)](0,200),1),t;var n=W[s(532)][s(271)];if(n[s(316)]||(n[s(316)]=1,r()),a){var c=("a"+Math[s(449)]())[s(430)](".",""),u=0,p=function(){var e=s;if(0!=u&&u>=a[e(196)])o[e(464)](e(303)+c+e(233)+c+e(454)+i+e(445));else{var t=W[e(141)](p),n=u;u+=524288;var r=a[e(310)](n,u);o[e(464)](e(380)+c+e(293)+c+e(304)+a[e(196)]+e(396)+T(r)+e(224)+t+e(336))}};p()}else o[s(464)](s(295)+i+s(190))},W[f(314)]=function(e,t,n){var r=f,i="";i||I||(i=y(r(406)));var a=!i&&l(e,null==e);if(i||a||(i=y(r(null==e?400:397))),i)return i+=y(r(142)),h(i+r(188)+t[r(429)](0,200),1),i;W[r(273)](e,r(389)+a+r(480)+t+r(451),n)},W[f(264)]=function(t,c,s,u){return new Promise(function(n,r){var i=A,a=(c=c||{})[i(172)]||"",o=setTimeout(function(){o=0,r(new Error(a+i(386)))},c[i(206)]||5e3),e=W[i(141)](function(e){var t=i;if(o)return clearTimeout(o),o=0,e[t(456)]?n({value:e[t(193)],bigBytes:W[t(131)](e[t(456)])}):e[t(483)]?n(e[t(193)]):void r(new Error(a+e[t(466)]))});W[c[i(144)]?i(273):i(314)](t,i(423)+e+i(488)+e+i(463)+e+i(528)+s+"\n\t",u)})};var p=f(395),r=function(){var i=f;if(I&&i(425)!=typeof UniServiceJSBridge){var e=W[i(391)];if(e){var t="";try{t=uni[i(135)](p)}catch(e){}if(e==t)return;h(y(i(453)),3)}e="r"+Math[i(449)]();try{uni[i(248)](p,e)}catch(e){}W[i(391)]=e,UniServiceJSBridge[i(129)](p),UniServiceJSBridge[i(267)](p,function(e){var t=i,n=e[t(368)]||"";if(t(125)!=n)if(t(370)!=n)if(-1==n[t(341)](t(185)))-1==n[t(341)](t(363))?h(y(t(364))+JSON[t(511)](e),1):W[t(509)](e);else{var r=W[t(532)][n];r&&r(e)}else O(e);else g(e)})}};W[f(141)]=function(t){var e=f,n=W[e(532)],r=++n.id,i=e(185)+r;return n[i]=function(e){delete n[i],t(e)},i},W[f(232)]=function(e){UniViewJSBridge[f(280)](p,e)},W[f(237)]=function(r,i,e){var a=f;if(C&&V){var o=W[a(288)];if(o){var c=W[a(532)],s=0,u=++c.id;c[a(363)+u]=function(e){s=e,t()};var p=0,t=function(){var e=a;if(0!=p&&p>=r[e(196)])return delete c[e(363)+u],void i(s);var t=p;p+=524288;var n=r[e(310)](t,p);W[e(232)]({action:e(t?227:317),wvCid:o,wvID:u,mainID:s,b64:T(n)})};t()}else e(y(a(379)))}else e(y(a(157)))},W[f(509)]=function(e){var t=f,n=e[t(139)],r=W[t(532)],i=t(363);t(317)==e[t(368)]&&(n=++r.id,r[i+n]={memory:new Uint8Array(2097152),mOffset:0});var a=r[i+n];if(a){var o=new Uint8Array(k(e[t(419)])),c=o[t(162)];if(a[t(217)]+c>a[t(132)][t(162)]){var s=new Uint8Array(a[t(132)][t(162)]+Math[t(335)](2097152,c));s[t(468)](a[t(132)][t(481)](0,a[t(217)])),a[t(132)]=s}a[t(132)][t(468)](o,a[t(217)]),a[t(217)]+=c,W[t(273)](R(e[t(519)]),t(147)+i+e[t(255)]+t(155)+n+t(212))}else h(y(t(128)),3)},W[f(131)]=function(e){var t=f;if(!I)return null;var n=W[t(532)],r=n[t(363)+e];return delete n[t(363)+e],r?r[t(132)][t(322)][t(310)](0,r[t(217)]):null},W[f(431)]=function(n,i,a,r){var o=f;a=a||B,r=r||B;var c=function(e){var t=A;r(y(t(170),0,n)+(e[t(348)]||e[t(466)]))};if(N){var e=wx[o(359)][o(515)]+"/"+n;wx[o(376)]()[o(437)]({filePath:e,encoding:o(458),data:i,success:function(){a(e)},fail:c})}else I?plus.io[o(173)](plus.io[o(489)],function(e){var t=o;e[t(210)][t(146)](n,{create:!0},function(n){var r=t;n[r(313)](function(e){var t=r;e[t(175)]=function(){a(n[t(494)])},e[t(243)]=c;try{e[t(282)](T(i))}catch(e){c(e)}},c)},c)},c):r(y(o(152)))};var i=function(e){var t=f;if(_(),I){var n=y(t(486),0,m),r=W[t(296)];r&&(!e&&W[t(374)]||(W[t(374)]=1,r[t(521)]?h(y(t(174))+n):h(y(t(235))+n))),W[t(375)]?r?!e&&W[t(291)]||(W[t(291)]=1,h(y(t(473))+n)):h(y(t(428))+n,1):W[t(289)]&&(W[t(524)]?!e&&W[t(278)]||(W[t(278)]=1,h(y(t(133))+n)):h(y(t(477))+n,1))}};W[f(283)]=function(e,t,n,i){var r=f,a=[];if(N){var o=function(n){var r=A;n>=t[r(162)]?i[r(345)](e,a):e[r(367)]()[r(471)](t[n])[r(323)]({node:!0})[r(347)](function(e){var t=r;a[t(285)](e[0][t(286)]),o(n+1)})};o(0)}else if(j){for(var c=0,s=t[r(162)];c<s;c++){var u=t[c],p=e[r(479)][r(436)](u+r(493)),d=p[0],v=p[1];d?(v&&(v[r(513)](r(219))||(d=p[1],v=p[0]),v[r(465)][r(472)](v)),d[r(183)][r(297)]=r(191),(v=document[r(204)](r(525)))[r(260)](r(219),"1"),v[r(183)][r(514)]=v[r(183)][r(390)]=r(418),d[r(465)][r(470)](v)):h(y(r(315),0,u),1),a[r(285)](v)}i[r(345)](e,a)}else{if(I){var l=[];for(c=0,s=t[r(162)];c<s;c++)l[r(285)](r(154)+t[c]+r(189)+(c+1)+r(276));return l[r(285)](n),void W[r(314)](e,l[r(518)]("\n"))}h(y(r(140)),1)}};var U=function(){var r=f;b(r(164),{},null,null,function(e){var t=r,n=e[t(368)];t(434)==n?(i||h("["+a+t(354)+e[t(329)]),i=1,e[t(455)]?h("["+a+"]["+e[t(172)]+"]"+e[t(348)],1):h("["+a+"]["+e[t(172)]+"]"+e[t(348)])):t(340)==n?W[t(352)](e[t(200)],e[t(369)]):t(384)==n||h(y(t(181),0,a)+t(530)+n,3)});var e=W[r(296)],i=0,a=e&&e[r(521)]?d:r(127);e&&(W[r(202)]=1)},s=f(138),u=f(492)+s,d=s,_=W[f(216)]=function(){var e=f,t=W[e(296)],n="";if(!t||!V)return"";if(C&&(n=y(e(305))),!n&&t[e(521)]){if(!W[e(452)]){for(var r=0,i=d=t[e(382)]||d,a=0;!r&&a<2;a++){try{r=uni[e(234)](i)}catch(e){}if(r||i!=s)break;i=s+"-"+(M?e(218):e(249))}if(!(W[e(452)]=r)){i=d==s?u:d;n=y(e(371),0,i)}}}else n||t[e(229)]||(n=y(e(203)));return n&&(W[e(296)]=null,h(n,1)),W[e(149)]=n},b=function(e,t,n,r,i){var a=f;_();var o=W[a(296)];if(o){var c={action:e,args:t||{}};i||(i=function(e){var t=a;t(417)==e[t(308)]?n&&n(e[t(193)],e):r&&r(e[t(348)])}),o[a(521)]?W[a(452)][a(229)](c,i):o[a(229)](c,i)}else{var s=W[a(149)]||y(a(250));r&&r(s)}};W[f(405)]=function(r,i){return new Promise(function(t,n){var e=A;if(!I)return n(new Error(y(e(510))));W[e(202)]||U(),b(r,i,function(e){t(e)},function(e){n(new Error(e))})})},o[f(350)]=function(e,t){i(),e()},o[f(421)]=function(){return e(f(421))},o[f(516)]=function(){return e(f(516))};var e=function(e){var t=f;if(!v())return!1;var n=D[t(520)];if(n){var r=w(1);r?h(r,1):W[t(273)](R(n[t(270)]),t(414)+e+"()")}else h(y(t(279),0,e),3)};o[f(435)]=function(e,t,n){var c=f,r=D[c(520)];D[c(520)]=null,r&&v()&&W[c(273)](R(r[c(270)]),c(137)),!v()||W[c(333)]?(W[c(416)]=W[c(274)],W[c(346)]=W[c(411)],i(!0),function(r){var i=c;if(!I)return r();var e=W[i(338)]=W[i(338)]||{},n=function(e,t,n){h(y(i(360),0,P)+e,t||0),n||r()},t=W[i(296)];if(t||e[i(179)])return e[i(179)]=e[i(179)]||(t[i(521)]?2:1),2==e[i(179)]?n(y(i(241))):n(y(i(507)));var a=i(426)+(e[i(230)]=e[i(230)]||uni[i(387)]()[i(230)]||"0")+i(213);if(W[i(372)]){if(W[i(372)]==a)return n(a);h(y(i(447),0,a),3)}var o=function(e){var t=i;n(t(239)+P+t(158)+a+t(487)+u+t(446)+m+" ",3,e)};if(e[i(495)])return o();o(1),e[i(495)]=1,uni[i(160)]({title:i(214),content:"文件"+P+i(467),showCancel:!1,confirmText:i(408),complete:function(){r()}})}(function(){a(e,t,n)})):n(y(c(491)))};var a=function(a,o,c){var s=f;if(C)return W[s(378)]?void o():void c(y(s(496)));var e=function(r){var i=s;if(M){h(y(i(353)));var a=function(){var e=i;if(W[e(150)])r();else{var t=plus[e(265)][e(240)](e(298))[e(361)](),n=t[e(527)]();1970168948==n?t[e(462)](a):1735552628==n?(h(y(e(498))),r()):(h(y(e(182))+e(169)+n,1),c(y(e(269)),!0)),plus[e(265)][e(366)](t)}};a()}else h(y(i(399))),plus[i(475)][i(318)]([i(512)],function(e){var t=i;0<e[t(320)][t(162)]?(h(y(t(252))+JSON[t(511)](e)),r()):(h(y(t(469)),1,e),c(y(t(443)),!0))},function(e){var t=i;h(y(t(221))+e[t(348)],1,e),c(y(t(478))+e[t(348)])})},t=function(e){var t=s;U(),b(t(527),{},e,c)};if(W[s(375)])e(function(){t(o)});else{var u=R(s(266)),n=function(n){var r=s,e=w(1);if(e)c(y(r(355))+e);else{var t=W[r(141)](function(e){var t=r;e.ok?n():c(e[t(466)])});W[r(273)](u,r(438)+t+r(272)+JSON[r(511)](y(r(321)))+r(153)+JSON[r(511)](y(r(192),0,r(166)+P+'"'))+r(197)+p+r(383))}},r=function(e){var n=s;if(W[n(460)](a)){var t=W[n(141)](function(e){var t=n;e.ok?o():c(e[t(466)],e[t(223)])}),r=n(246),i=W[r]||{};W[n(273)](u,n(403)+!!e+n(448)+r+"="+JSON[n(511)](i)+n(413)+t+n(220)+t+n(330))}else c(n(201))};W[s(296)]?n(function(){e(function(){t(function(){r(!0)})})}):n(function(){e(function(){r()})})}};o[f(231)]=function(t,c,n,s){var u=f,e=D[u(520)];if(D[u(520)]=null,e&&v()&&W[u(273)](R(e[u(270)]),u(137)),!v()||W[u(333)]){D[u(388)]=c;var p=S(c);if(p[u(468)][u(211)]=!0,p[u(461)]=u(501),D[u(143)]=!1,D[u(520)]=p,W[u(257)]=p,C)return W[u(378)]?void n():void s(y(u(328)));var r=function(t){var n=u,e=JSON[n(409)](JSON[n(511)](d));e[n(381)]=e[n(381)]||48e3,e[n(482)]=e[n(369)],e[n(369)]=e[n(381)];var r=(e[n(186)]||{})[n(167)],i=e[n(177)];r&&null==i&&(i=1,e[n(177)]=!0),M||null!=e[n(522)]||(e[n(522)]=i?7:W[n(312)]||"1"),h(n(343)+JSON[n(511)](e)),U(),b(n(500),e,function(){var e=n;W[e(198)]=setInterval(function(){b(e(508),{},function(){})},5e3),t()},s)};clearInterval(W[u(198)]);var d={};for(var i in c)/_renderjs$/[u(356)](i)||(d[i]=c[i]);if(d=JSON[u(409)](JSON[u(511)](d)),W[u(375)])r(n);else{p[u(468)][u(176)]=u(358);var a=function(n,e){var r=u,t=w(1);if(t)s(y(r(268))+t);else{p[r(270)]=l(null,r(266)),D[r(143)]=e;var i=[r(441)+JSON[r(511)](d)+";"],a=r(184);i[r(285)](r(245)+(c[r(339)]||0)+r(499)+(c[r(215)]||0)+r(404)+(c[r(136)]||0)+r(145)+a+r(433)+a+r(326)),(c[r(485)]||c[r(309)])&&i[r(285)](r(263)+(c[r(309)]||0)+r(302));var o=W[r(141)](function(e){var t=r;e.ok?n():s(e[t(466)])});i[r(285)](r(301)+o+r(484)+o+r(208)),W[r(314)](R(p[r(270)]),i[r(518)]("\n"))}};W[u(296)]?a(function(){var e=u;W[e(460)](t)?r(n):s(e(201))},!0):a(n)}}else s(y(u(261)))},o[f(222)]=function(e){return!!v()&&""},o[f(259)]=function(e){var t=f;if(!v())for(var n in e)/_renderjs$/[t(356)](n)&&delete e[n]};var g=function(e){var t=f,n=D[t(520)];n&&(n[t(468)][t(369)]=e[t(294)],n[t(468)][t(277)]=e[t(319)]);for(var r=e[t(180)],i=0,a=r[t(162)];i<a;i++)D(r[i],e[t(369)])},O=function(e){var t=f,n=D[t(520)];if(n){var r=new Uint8Array(k(e[t(349)]));n[t(468)][t(485)]&&n[t(468)][t(485)](r)}else h(y(t(187)),3)},D=function(e,t){var n=f,r=D[n(520)];if(r){if(r[n(450)]||r[n(420)]({envName:o[n(163)],canProcess:o[n(292)]()},t),r[n(450)]=1,e instanceof Int16Array)var i=new Int16Array(e);else i=new Int16Array(k(e));var a=E[n(238)](i);r[n(385)](i,a)}else h(y(n(505)),3)};function F(){var e=initMemory;return(F=function(){return e})()}W[f(352)]=function(e,t){var n=f;if(D[n(143)]){var r=D[n(520)];return r?void W[n(273)](R(r[n(270)]),n(392)+e+'",'+t+")"):void h(y(n(253)),3)}D(e,t)},o[f(401)]=function(n,a,r){var o=f,c=function(e){var t=A;W[t(460)](n)&&(D[t(520)]=null,s&&u&&v()&&W[t(273)](R(s[t(270)]),t(137))),r(e)},s=D[o(520)],u=!0,p=a?"":W[o(503)](),e=function(){var e=o;if(W[e(460)](n))if(D[e(520)]=null,s){if(h(e(457)+s[e(209)]+e(126)+s[e(284)]+e(398)+JSON[e(511)](D[e(388)])),!a)return d(),void c(p);s[e(228)](function(e,t,n){d(),a(e,t,n)},function(e){d(),c(e)})}else c(y(e(476))+(p?" ("+p+")":""));else c(e(201))},d=function(){var e=o;if(W[e(460)](n))for(var t in D[e(520)]=null,s[e(468)])D[e(388)][t]=s[e(468)][t]};if(C)return W[o(378)]?void e():void c(y(o(331)));var t=function(e){b(o(159),{},e,c)};if(clearInterval(W[o(198)]),W[o(375)])t(e);else{var i=function(e){var r=o;if(s){var t=w(1);if(t)c(y(r(394))+t);else{var n=W[r(141)](function(e){var t=r;if(u=!1,e.ok){s[t(468)][t(176)]=D[t(388)][t(176)],s[t(468)][t(369)]=e[t(294)],s[t(468)][t(277)]=e[t(319)],d();var n=W[t(131)](e[t(207)]);n?a(n,e[t(342)],e[t(415)]):c(y(t(247)))}else c(e[t(466)])}),i=r(373)+(a&&D[r(388)][r(171)]||0)+r(130)+!a+r(148)+n+r(337)+n+r(281);W[r(314)](R(s[r(270)]),i)}}else c(y(r(497))+(p?" ("+p+")":""))};W[o(296)]?t(function(){var e=o;W[e(460)](n)?i():c(e(201))}):i()}}}();})(["UniNativeRecordReceivePCM","Y3rC::正在调用plus.ios@AVAudioSession请求iOS原生录音权限"," Info]","ksoA::无法调用RequestPermission：","test","wv_","unknown","env","FabE::【在App内使用{1}的授权许可】","sharedInstance","UniPageOnShow","bigBytes_","ZHwv::[MainReceive]从renderjs发回未知数据：","1491CBkBUP","deleteObject","createSelectorQuery","action","sampleRate","recEncodeChunk","SCW9::配置了RecordApp.UniNativeUtsPlugin，但当前App未打包进原生录音插件[{1}]","UniAppUseLicense","(function(){\n\t\t\tvar stopFn=","__nnM6","UniWithoutAppRenderjs","getFileSystemManager","MiniProgramWx_onShow","UniAppUseNative","kE91::renderjs中的mounted内需要调用RecordApp.UniRenderjsRegister才能调用RecordApp.UniWebViewSendBigBytesToMain","(function(){\n\t\t\tvar cur=window.","nativeSampleRateTarget","nativePluginName",'",val);\n\t\t})()',"noop","envIn","处理超时","getSystemInfoSync","param",'(function(){\n\t\tif(!window.RecordApp){ window["console"].error("renderjs中未import导入RecordApp"); return; }\n\t\tvar wvCid="',"height","__uniAppMainReceiveBind",'RecordApp.UniNativeRecordReceivePCM("',"RegisterPlatform","H6cq::无法调用Stop：","RecordApp__uniAppMainReceive",'),mOffset:0};\n\t\t\tvar buf=new Uint8Array(RecordApp.UniAtob("',"6Iql::未找到此页面renderjs所在的WebView Cid"," set:","7Noe::正在调用plus.android.requestPermissions请求Android原生录音权限","mSbR::当前还未调用过RecordApp.UniWebViewActivate","Stop","qDo1::未找到此页面renderjs所在的WebView","(function(){\n\t\t\tRecordApp.UniAppUseNative=",";\n\t\tvar startFn=","UniNativeUtsPluginCallAsync","lU1W::当前不是App逻辑层"," WvCid=","我知道啦","parse","mzKj::RecordApp.UniRenderjsRegister 重复注册当前页面renderjs模块，一个组件内只允许一个renderjs模块进行注册","__uniAppComponentId","7ot0::需先调用RecordApp.RequestPermission方法",';\n\t\t\tRecordApp.RequestPermission(function(){\n\t\t\t\tRecordApp.UniWebViewSendToMain({action:"',"RecordApp.","mime","__uniAppReqWebViewId","success","100%","b64","envStart","Pause","$scope",'\n\t\tvar CallSuccess=function(val,buf){\n\t\t\tif(buf){\n\t\t\t\tRecordApp.UniWebViewSendBigBytesToMain(buf,function(dataID){\n\t\t\t\t\tRecordApp.UniWebViewSendToMain({action:"',"$vm","undefined","我已获得UniAppID=","Tag","fqhr::当前已配置RecordApp.UniWithoutAppRenderjs，必须提供原生录音插件或uts插件才能录音，请参考RecordApp.UniNativeUtsPlugin配置","substr","replace","UniSaveLocalFile","SWsy::检测到有其他页面或组件调用了RecordApp.UniPageOnShow（WvCid={1}），但未调用过RecordApp.UniWebViewActivate（当前WvCid={2}），部分功能会继续使用之前Activate的WebView和组件，请确保这是符合你的业务逻辑，不是因为忘记了调用UniWebViewActivate","){\r\n\t\t\tprocBefore&&procBefore.call(This,","onLog","RequestPermission","querySelectorAll","writeFile",'(function(){\n\t\t\tvar err="",val={action:"',"!id || !cid","RecApp Renderjs","var set=","uid","l7WP::用户拒绝了录音权限","4jKV::RecordApp.UniRenderjsRegister 需在renderjs中调用并且传入当前模块的this","\n\t\t\t})()","-Android （会赠送Android版原生插件）；购买后可联系客服，同时提供订单信息，客服拉你进入VIP支持QQ群，入群后在群文件中可下载此js文件最新源码；客服联系方式：QQ 1251654593 ，或者直接联系作者QQ 753610399 （回复可能没有客服及时）。详细请参考文档: ","aPoj::UniAppUseLicense填写无效，如果已获取到了商用授权，请填写：{1}，否则请使用空字符串",";\r\n\t\t\tRecordApp.Current=null; //需先重置，不然native变化后install不一致\n\t\t\tRecordApp.","random","_appStart","\n\t\t}).call(vm);\n\t})()","__uniNP","vEgr::不应该出现的MainReceiveBind重复绑定",";\n\t\t\t\t","isError","dataID","rec encode: pcm:","binary","1401732QFMzNG","__Sync","dataType","requestRecordPermission",'", isOk:true, value:val});\n\t\t\t}\n\t\t};\n\t\tvar CallFail=function(err){\n\t\t\tRecordApp.UniWebViewSendToMain({action:"',"evalJS","parentNode","errMsg","在uni-app中编译到App平台时仅供测试用，不可用于正式发布或商用，正式发布或商用需先获得授权许可（编译到其他平台时无此授权限制，比如：H5、小程序，均为免费授权）。本对话框仅在第一次请求录音权限时会弹出一次，如何去除本弹框、如何获取商用授权、更多信息请看控制台日志","set","Ruxl::plus.android请求录音权限：无权限","appendChild","select","removeChild","xYRb::当前RecordApp运行在逻辑层中（性能会略低一些，可视化等插件不可用）","_cid_","android","YP4V::未开始录音","S3eF::未找到当前页面renderjs所在的WebView，如果确实没有renderjs，请设置RecordApp.UniWithoutAppRenderjs=true","Mvl7::调用plus的权限请求出错：","$el",'",vm=RecordApp.__uniWvCallVm;\n\t\tif(!vm || RecordApp.__uniWvCallWvCid!=wvCid){\n\t\t\tif(!RecordApp.__UniData[wvCid]){ RecordApp.CLog("renderjs中的mounted内需要调用RecordApp.UniRenderjsRegister",1); return; }\n\t\t\tvar el=document.querySelector("[rec_wv_cid_key=\'"+wvCid+"\']");\n\t\t\tvm=el&&el.__rModule;\n\t\t\tif(!vm){ RecordApp.CLog("没有找到组件的renderjs模块 WvCid="+wvCid,1); return; }\n\t\t\tRecordApp.__uniWvCallVm=vm;\n\t\t\tRecordApp.__uniWvCallWvCid=wvCid;\n\t\t}; (function(){ var This=this;\n\t\t\t',"subarray","nativeSampleRateRecSet","isOk",'",ok:1});\n\t\t},function(errMsg){\n\t\t\tRecordApp.UniWebViewSendToMain({action:"',"takeoffEncodeChunk","1f2V:: | RecordApp的uni-app支持文档和示例：{1} ","' ，就不会弹提示框了；或者购买了配套的原生录音插件，设置RecordApp.UniNativeUtsPlugin参数后，也不会弹提示框。【获取授权方式】到DCloud插件市场购买授权: ",'", isOk:true, value:val, dataID:dataID});\n\t\t\t\t},CallFail)\n\t\t\t}else{\n\t\t\t\tRecordApp.UniWebViewSendToMain({action:"',"PUBLIC_DOWNLOADS","WpKg::RecordApp.UniWebViewActivate 已切换当前页面或组件的renderjs所在的WebView","PkQ2::需先调用RecordApp.UniWebViewActivate，然后才可以调用RequestPermission","https://ext.dcloud.net.cn/plugin?name="," canvas","fullPath","show","Jk72::不应当出现的非H5权限请求","pP4O::未开始录音","j15C::已获得iOS原生录音权限",";\r\n\t\tvar procBefore=","recordStart","arraybuffer","getWebviewById","__StopOnlyClearMsg","TfJX::当前不是App逻辑层","BjGP::未开始录音，但收到Uni Native PCM数据","peIm::当前还未调用过RecordApp.UniWebViewActivate","e71S::已购买uts插件，获得授权许可","recordAlive","__UniMainReceiveBigBytes","MrBx::需在App逻辑层中调用原生插件功能","stringify","android.permission.RECORD_AUDIO","getAttribute","width","USER_DATA_PATH","Resume","rec_wv_cid_key","join","wvCid","rec","nativePlugin","android_audioSource","__WebVieW_Id__","__uniAppWebView","canvas","UniRenderjsRegister","recordPermission",'",errMsg:err});\n\t\t};\n\t\t',"import 'recorder-core/src/app-support/app-miniProgram-wx-support.js'","action=","33zDWFvn","__UniData","recProcess"," srcSR:","RecorderUtsPlugin","CjMb::无效的BigBytes回传数据","unsubscribe",";\n\t\t\tvar clear=","UniMainTakeBigBytes","memory","0hyi::当前RecordApp运行在renderjs所在的WebView中（逻辑层中只能做有限的实时处理，可视化等插件均需要在renderjs中进行调用）","RecApp Main","getStorageSync","start_renderjs","RecordApp.Stop()","Recorder-NativePlugin","mainID","yI24::RecordApp.UniFindCanvas未适配当前环境","UniMainCallBack","TtoS::，不可以调用RecordApp.UniWebViewVueCall","nativeToRjs","useEval",";\n\t\tset.onProcess=function(","getFile",'(function(){\n\t\tvar fn=RecordApp.__UniData["',';\n\t\t\tvar errFn=function(errMsg){\n\t\t\t\tRecordApp.UniWebViewSendToMain({action:"',"__uniNupErr","DisableIOSPlusReqPermission","ownerId","kxOd::当前环境未支持保存本地文件",';\n\t\t\t}\n\t\t\tif(!err && !RecordApp.Platforms["UniApp-Renderjs"]){\n\t\t\t\terr=','\n\t\t\t\tvar cls="','"];\n\t\tif(fn)fn(',"$page","MujG::只允许在renderjs中调用RecordApp.UniWebViewSendBigBytesToMain","在uni-app中编译到App平台时仅供测试用（App平台包括：Android App、iOS App），不可用于正式发布或商用，正式发布或商用需先获取到商用授权许可（编译到其他平台时无此授权限制，比如：H5、小程序，均为免费授权）。未获得授权时，在App打开后第一次调用RecordApp.RequestPermission请求录音权限时，会先弹出商用授权提示框；获取到授权许可后，请在调用RequestPermission前设置 RecordApp.UniAppUseLicense='","recordStop","showModal","30nhLMtc","length","Key","jsCall"," WvCid=wv_",'"@/uni_modules/Recorder-UniCore/',"echoCancellation","Rec_WvCid","denied ","UqfI::保存文件{1}失败：","stop_renderjs","tag","requestFileSystem","XSYY::当前录音由原生录音插件提供支持","onwrite","type","appNativePlugin_AEC_Enable","195807CwYXbR","uts","newBuffers","dl4f::{1}回传了未知内容，","iKhe::plus.ios请求录音权限，状态值: ","style","buffers,power,duration,sampleRate,newIdx","mainCb_","audioTrackSet","MTdp::未开始录音，但收到renderjs回传的onRecEncodeChunk","   jsCode=",'";\n\t\t\t\tvar els=this.$ownerInstance.$el.querySelectorAll(cls+" canvas"),el=els[0],el2=els[1];\n\t\t\t\tif(!el){\n\t\t\t\t\tRecordApp.CLog(Recorder.i18n.$T("dzX0::未找到Canvas：{1}，请确保此DOM已挂载（可尝试用$nextTick等待DOM更新）",0,cls),1);\n\t\t\t\t}else{\n\t\t\t\t\tif(el2){\n\t\t\t\t\t\tif(!el2.getAttribute("el2")){ el=els[1]; el2=els[0] }\n\t\t\t\t\t\tel2.parentNode.removeChild(el2);\n\t\t\t\t\t}\n\t\t\t\t\tel.style.display="none";\n\t\t\t\t\tel2=document.createElement("canvas");\n\t\t\t\t\tel2.setAttribute("el2","1"); el2.style.width=el2.style.height="100%";\n\t\t\t\t\tel.parentNode.appendChild(el2);\n\t\t\t\t}\n\t\t\t\tvar canvas',"\n})()","none","AN0e::需在renderjs中import {1}","value","VsdN::需重新调用RecordApp.RequestPermission方法","683032VYqrIb","byteLength",';\n\t\t\t}\n\t\t\tif(err){\n\t\t\t\tval.ok=0; val.errMsg=err;\n\t\t\t}\n\t\t\tUniViewJSBridge.publishHandler("',"_X3Ij_alive","GwCz::RecordApp.UniWebViewActivate 需要传入当前页面或组件的this对象作为参数","pcmDataBase64","Incorrect sync status","__uniNbjc","TGMm::提供的RecordApp.UniNativeUtsPlugin值不是RecordApp的uts原生录音插件","createElement","4912RhzVAZ","timeout","dataId",'",errMsg:errMsg});\n\t\t});',"recSize","root","disableEnvInFix",");\n\t})()","的商用授权","未获得商用授权时，App上仅供测试哈","onProcessBefore_renderjs","UniCheckNativeUtsPluginConfig","mOffset","iOS","el2",'",ok:1});\n\t\t\t},function(errMsg,isUserNotAllow){\n\t\t\t\tRecordApp.UniWebViewSendToMain({action:"',"0JQw::plus.android请求录音权限出错：","Start_Check","isUserNotAllow",'"));\n\t\t\tcur.memory.set(buf,cur.mOffset);\n\t\t\tcur.mOffset+=buf.byteLength;\n\t\t\tRecordApp.UniWebViewSendToMain({action:"',"1033494ixaWck","10uuDSAB","bigBytes_chunk","stop","request","appId","Start","UniWebViewSendToMain",".memory.buffer; delete window.","requireNativePlugin","nnM6::当前录音由uts插件提供支持","_$id","UniWebViewSendBigBytesToMain","pcm_sum","当前未获得授权许可。文件","importClass","w37G::已购买原生录音插件，获得授权许可","4ATo::Recorder-UniCore目前只支持：H5、APP(Android iOS)、MP-WEIXIN，其他平台环境需要自行编写适配文件实现接入","onerror","Uc9E::RecordApp.UniRenderjsRegister 发生不应该出现的错误（可能需要升级插件代码）：","var procFn=","RequestPermission_H5OpenSet","gomD::不应该出现的renderjs发回的文件数据丢失","setStorageSync","Android","H753::未配置RecordApp.UniNativeUtsPlugin原生录音插件","7kJS::RecordApp.UniRenderjsRegister 已注册当前页面renderjs模块","Bgls::已获得Android原生录音权限：","byzO::未开始录音，但收到UniNativeUtsPlugin PCM数据"," wvCid=","wvID","5722QDxTbh","__Rec","@act","AllStart_Clean","setAttribute","XCMU::需先调用RecordApp.UniWebViewActivate，然后才可以调用Start","UniWebViewActivate","var takeFn=","UniWebViewCallAsync","ios","@req","subscribe","Bjx9::无法调用Start：","0caE::用户拒绝了录音权限","__wvCid","pageShow",'",ok:1};\n\t\t\tif(!err && !window.RecordApp){\n\t\t\t\terr=',"UniWebViewEval","__uniAppWebViewId","RXs7::微信小程序中需要：{1}","=el2;\n\t\t\t","bitRate","__0hyi","0FGq::未开始录音，不可以调用{1}","publishHandler",'",ok:1,recSet_sr:recSet.sampleRate,recSet_bit:recSet.bitRate,dataId:dataId,duration:duration,mime:mime});\n\t\t\t\t},errFn);\n\t\t\t},errFn);\n\t\t})()',"writeAsBinary","UniFindCanvas","srcSampleRate","push","node","Platforms","__UniWvCid","__hasWvActivate","ipB3::RecordApp.UniWebViewActivate 发生不应该出现的错误（可能需要升级插件代码）：","__xYRb","CanProcess","=window.","recSet_sr","(function(){\n","UniNativeUtsPlugin","display","AVAudioSession","$root","miniProgram-wx",'RecordApp.Start(set,function(){\n\t\t\tstartFn&&startFn.call(This);\n\t\t\tRecordApp.UniWebViewSendToMain({action:"',';\n\t\t\tset.takeoffEncodeChunk=function(bytes){\n\t\t\t\tRecordApp.UniWebViewSendToMain({action:"recEncodeChunk",bytes:RecordApp.UniBtoa(bytes.buffer)});\n\t\t\t\ttakeFn&&takeFn.apply(This,arguments);\n\t\t\t};',"(function(){\n\t\t\t\tvar BigBytes=window.","||{memory:new Uint8Array(","l6sY::renderjs中不支持设置RecordApp.UniNativeUtsPlugin","$ownerInstance","__rModule","status","takeoffEncodeChunk_renderjs","slice","igw2::，不可以调用RecordApp.UniWebViewEval","Default_Android_AudioSource","createWriter","UniWebViewVueCall","k7im::未找到Canvas：{1}，请确保此DOM已挂载（可尝试用$nextTick等待DOM更新）","mrBind","bigBytes_start","requestPermissions","recSet_bit","granted","TSmQ::需要在页面中提供一个renderjs，在里面import导入RecordApp、录音格式编码器、可视化插件等","buffer","fields","sWvCid","$getAppWebview",');\n\t\t\tvar newBuffers=[],recSet=RecordApp.__Rec.set;\n\t\t\tfor(var i=newIdx;i<buffers.length;i++)newBuffers.push(RecordApp.UniBtoa(buffers[i].buffer));//@@Fast\n\t\t\tRecordApp.UniWebViewSendToMain({action:"recProcess",recSet_sr:recSet.sampleRate,recSet_bit:recSet.bitRate,sampleRate:sampleRate,newBuffers:newBuffers});\n\t\t\treturn procFn&&procFn.apply(This,arguments);\n\t\t};',"UniApp-Renderjs","rSLO::不应当出现的非H5录音Start","info",'",errMsg:errMsg,isUserNotAllow:isUserNotAllow});\n\t\t\t});\n\t\t})()',"TPhg::不应当出现的非H5录音Stop","AGd7::需要先调用RecordApp.UniWebViewActivate方法","__callWvActivate","86658jqvKrB","max",'"});\n\t\t})()','",errMsg:errMsg});\n\t\t\t};\n\t\t\tRecordApp.Stop(clear?null:function(arrBuf,duration,mime){\n\t\t\t\tstopFn&&stopFn.apply(This,arguments);\n\t\t\t\tvar recSet=RecordApp.__Rec.set,t1=Date.now();\n\t\t\t\tRecordApp.CLog("开始传输"+arrBuf.byteLength+"字节的数据回逻辑层，可能会比较慢，推荐使用takeoffEncodeChunk实时获取音频文件数据可避免Stop时产生超大数据回传");\n\t\t\t\tRecordApp.UniWebViewSendBigBytesToMain(arrBuf,function(dataId){//数据可能很大\n\t\t\t\t\tRecordApp.CLog("完成传输"+arrBuf.byteLength+"字节的数据回逻辑层，耗时"+(Date.now()-t1)+"ms");\n\t\t\t\t\tRecordApp.UniWebViewSendToMain({action:"',"__FabE","onProcess_renderjs","onRecord","indexOf","duration","Native Start Set:","webview","apply","__uniAppReqComponentId","exec","message","bytes","Install","UniApp-Main"])}(i,r,0,a.$T,n)}else console.error("需要先引入RecordApp，请按下面代码引入：\n1. 项目根目录 npm install recorder-core\n2. 页面中按顺序import\nimport Recorder from 'recorder-core'\nimport RecordApp from 'recorder-core/src/app-support/app.js'\nimport 你需要的音频格式编码器、可视化插件\n参考文档："+i)}();