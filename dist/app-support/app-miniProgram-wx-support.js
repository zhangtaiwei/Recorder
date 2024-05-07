/*
录音
https://github.com/xiangyuecn/Recorder
src: app-support/app-miniProgram-wx-support.js
*/
!function(e){var n="object"==typeof window&&!!window.document,t=(n?window:Object).Recorder,r=t.i18n;!function(a,e,n,t){"use strict";var r="object"==typeof wx&&!!wx.getRecorderManager,s=a.RecordApp,y=s.CLog,i={Support:function(e){e(r)},CanProcess:function(){return!0}};s.RegisterPlatform("miniProgram-wx",i),s.MiniProgramWx_onShow=function(){h()},i.RequestPermission=function(e,n,t){o(n,t)},i.Start=function(e,n,t,r){x.param=n;var o=a(n);o.set.disableEnvInFix=!0,o.dataType="arraybuffer",x.rec=o,s.__Rec=o,_(t,r)},i.Stop=function(n,r,t){v();var o=function(e){s.__Sync(n)&&(x.rec=null),t(e)},a=x.rec;x.rec=null;var e=r?"":s.__StopOnlyClearMsg();if(a){y("rec encode: pcm:"+a.recSize+" srcSR:"+a.srcSampleRate+" set:"+JSON.stringify(x.param));var i=function(){if(s.__Sync(n))for(var e in a.set)x.param[e]=a.set[e]};if(!r)return i(),void o(e);a.stop(function(e,n,t){i(),r(e,n,t)},function(e){i(),o(e)})}else o("未开始录音"+(e?" ("+e+")":""))};var c,f,u,M,R,x=function(e,n){var t=x.rec;if(t){t._appStart||t.envStart({envName:i.Key,canProcess:i.CanProcess()},n),t._appStart=1;for(var r=0,o=0;o<e.length;o++)r+=Math.abs(e[o]);t.envIn(e,r)}else y("未开始录音，但收到wx PCM数据",3)},g=!1,o=function(e,t){if(v(),w(),g)e();else{var r=wx.getRecorderManager(),o=1;r.onStart(function(){g=!0,o&&(o=0,p(r),e())}),r.onError(function(e){var n="请求录音权限出现错误："+e.errMsg;y(n+"。"+l,1,e),o&&(o=0,p(r),t(n,!0))}),d("req",r)}},l="请自行检查wx.getSetting中的scope.record录音权限，如果用户拒绝了权限，请引导用户到小程序设置中授予录音权限。",m=0,v=function(){var e=c;c=null,e&&p(e)},p=function(e){m=Date.now(),e.stop()},d=function(e,n){var t={duration:6e5,sampleRate:48e3,encodeBitRate:32e4,numberOfChannels:1,format:"PCM",frameSize:f?1:4},r=x.param||{},o=(r.audioTrackSet||{}).echoCancellation;if("android"==u.platform){var a=r.android_audioSource,i="";null==a&&o&&(a=7),null==a&&(a=s.Default_Android_AudioSource),1==a&&(i="mic"),5==a&&(i="camcorder"),6==a&&(i="voice_recognition"),7==a&&(i="voice_communication"),i&&(t.audioSource=i)}o&&y("mg注意：iOS下无法配置回声消除，Android无此问题，建议都启用听筒播放避免回声：wx.setInnerAudioOption({speakerOn:false})",3),y("["+e+"]mg.start obj",t),n.start(t)},h=function(){c&&c.__pause&&(y("mg onShow 录音开始恢复...",3),c.resume())},_=function(n,t){v(),w(),R={},f&&y("RecorderManager.onFrameRecorded 在开发工具中测试返回的是webm格式音频，将会尝试进行解码",3);var o=!1,a=1,i=function(e){o||(o=!0,e?(v(),t(e)):n())},s=c=wx.getRecorderManager();s.onInterruptionEnd(function(){s==c&&(y("mg onInterruptionEnd 录音开始恢复...",3),s.resume())}),s.onPause(function(){s==c&&(s.__pause=Date.now(),y("mg onPause 录音被打断",3))}),s.onResume(function(){if(s==c){var e=s.__pause?Date.now()-s.__pause:0,n=0;s.__pause=0,300<e&&(n=Math.min(1e3,e),x(new Int16Array(48*n),48e3)),y("mg onResume 恢复录音，填充了"+n+"ms静默",3)}}),s.onError(function(e){if(s==c){var n=e.errMsg,t="mg onError 开始录音出错：";if(!o&&!s._srt&&/fail.+is.+recording/i.test(n)){var r=600-(Date.now()-m);if(0<r)return r=Math.max(100,r),y(t+"等待"+r+"ms重试",3,e),void setTimeout(function(){s==c&&(s._srt=1,y(t+"正在重试",3),d("retry start",s))},r)}y(1<a?t+"可能无法继续录音["+a+"]。"+n:t+n+"。"+l,1,e),i("开始录音出错："+n)}}),s.onStart(function(){s==c&&(y("mg onStart 已开始录音"),s._srt=0,s._st=Date.now(),i())}),s.onStop(function(e){y("mg onStop res:",e),s==c&&(!s._st||Date.now()-s._st<600?y("mg onStop但已忽略",3):(y("mg onStop 已停止录音，正在重新开始录音..."),a++,s._st=0,d("restart",s)))});var e=function(){s.onFrameRecorded(function(e){if(s==c){o||y("mg onStart未触发，但收到了onFrameRecorded",3),i();var n=e.frameBuffer;n&&n.byteLength&&(f?S(new Uint8Array(n)):x(new Int16Array(n),48e3))}}),d("start",s)},r=600-(Date.now()-m);0<r?(r=Math.max(100,r),y("mg.start距stop太近需等待"+r+"ms",3),setTimeout(function(){s==c&&e()},r)):e()},w=function(){u||(u=wx.getSystemInfoSync(),(f="devtools"==u.platform?1:0)&&(M=wx.createWebAudioContext()))},S=function(e){var n=R;n.pos||(n.pos=[0],n.tracks={},n.bytes=[]);var t=n.tracks,r=[n.pos[0]],o=function(){n.pos[0]=r[0]},a=n.bytes.length,i=new Uint8Array(a+e.length);i.set(n.bytes),i.set(e,a),n.bytes=i;var s=function(){n.bytes=[],x(new Int16Array(i),48e3)};if(n.isNotWebM)s();else{if(!n._ht){for(var c=0,f=0;f<i.length;f++)if(26==i[f]&&69==i[f+1]&&223==i[f+2]&&163==i[f+3]){c=f,r[0]=f+4;break}if(!r[0])return void(5120<i.length&&(y("未识别到WebM数据，开发工具可能已支持PCM",3),n.isNotWebM=!0,s()));if(P(i,r),!A(I(i,r),[24,83,128,103]))return;for(I(i,r);r[0]<i.length;){var u=I(i,r),g=P(i,r);if(!g)return;if(A(u,[22,84,174,107])){n._ht=i.slice(c,r[0]),y("WebM Tracks",t),o();break}}}for(var l=[],m=0;r[0]<i.length;){var v=r[0],p=I(i,r),d=(r[0],P(i,r));if(!d)break;if(A(p,[163])){var h=i.slice(v,r[0]);m+=h.length,l.push(h)}o()}if(m){var _=new Uint8Array(i.length-n.pos[0]);_.set(i.subarray(n.pos[0])),n.bytes=_,n.pos[0]=0;var w=[31,67,182,117,1,255,255,255,255,255,255,255];w.push(231,129,0),m+=w.length,l.splice(0,0,w),m+=n._ht.length,l.splice(0,0,n._ht);for(var S=new Uint8Array(m),f=0,b=0;f<l.length;f++)S.set(l[f],b),b+=l[f].length;M.decodeAudioData(S.buffer,function(e){for(var n=e.getChannelData(0),t=new Int16Array(n.length),r=0;r<n.length;r++){var o=Math.max(-1,Math.min(1,n[r]));o=o<0?32768*o:32767*o,t[r]=o}x(t,e.sampleRate)},function(){y("WebM解码失败",1)})}}},A=function(e,n){if(!e||e.length!=n.length)return!1;if(1==e.length)return e[0]==n[0];for(var t=0;t<e.length;t++)if(e[t]!=n[t])return!1;return!0},I=function(e,n,t){var r=n[0];if(!(r>=e.length)){var o=e[r],a=("0000000"+o.toString(2)).substr(-8),i=/^(0*1)(\d*)$/.exec(a);if(i){var s=i[1].length,c=[];if(!(r+s>e.length)){for(var f=0;f<s;f++)c[f]=e[r],r++;return t&&(c[0]=parseInt(i[2]||"0",2)),n[0]=r,c}}}},P=function(e,n){var t=I(e,n,1);if(t){var r=function(e){for(var n="",t=0;t<e.length;t++){var r=e[t];n+=(r<16?"0":"")+r.toString(16)}return parseInt(n,16)||0}(t),o=n[0],a=[];if(r<2147483647){if(o+r>e.length)return;for(var i=0;i<r;i++)a[i]=e[o],o++}return n[0]=o,a}}}(t,0,r.$T)}();