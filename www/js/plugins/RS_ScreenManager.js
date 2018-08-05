//==============================================================================
// RS_ScreenManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_ScreenManager = true;

/*:
 * @plugindesc (v1.0.8) <RS_ScreenManager>
 * @author biud436
 *
 * @param TEST OPTION (TEST ONLY)
 * @text 테스트 옵션
 *
 * @param options.resize
 * @text 그래픽 리사이징 옵션
 * @type boolean
 * @parent TEST OPTION (TEST ONLY)
 * @desc This is the parameter for resizing the graphics renderer
 * @default false
 * @on true
 * @off false
 *
 * @param options.autoScaling
 * @text 오토 스케일링
 * @type boolean
 * @parent TEST OPTION (TEST ONLY)
 * @desc This is the parameter for scaling the graphics objects.
 * @default false
 * @on true
 * @off false
 *
 * @param options.minWidth
 * @text 최소 폭 유지
 * @parent TEST OPTION (TEST ONLY)
 * @type boolean
 * @desc Set whether it can not set the width is less than minimum width
 * @default true
 * @on true
 * @off true
 *
 * @param options.minHeight
 * @text 최소 높이 유지
 * @parent TEST OPTION (TEST ONLY)
 * @type boolean
 * @desc Set whether it can not set the width is less than minimum height
 * @default true
 * @on true
 * @off true
 *
 * @param Scene Options
 * @text 장면 옵션
 *
 * @param Recreate Scene
 * @text 장면 재생성
 * @parent Scene Options
 * @type boolean
 * @desc To set as true, the current scene will recreate after changing screen size
 * @default true
 *
 * @param Use All Resolutions
 * @text 모든 해상도 표시
 * @parent Scene Options
 * @type boolean
 * @desc Sets whether resolution gets even if the resolution of your device is not supported.
 * @default false
 *
 * @param Enable Custom Aspect Ratio
 * @text 커스텀 화면 종횡비 사용
 * @parent Scene Options
 * @type boolean
 * @desc In case of true, the screen size will convert to fit a custom aspect ratio.
 * @default false
 *
 * @param Custom Aspect Ratio
 * @text 커스텀 화면 종횡비
 * @parent Scene Options
 * @type select
 * @desc Specify the aspect ratio as you want.
 * @default 16:9
 * @option 16:9 (Wide Screen)
 * @value 16:9
 * @option 4:3
 * @value 4:3
 *
 * @param Screen Size
 * @text 화면 크기
 *
 * @param Default Screen Size
 * @text 기본 화면 크기
 * @parent Screen Size
 * @type select
 * @desc This parameter allows you to change your default game screen size
 * Note that the screen size limited on you available screen size
 * @default 1280 x 720
 * @option 320 x 240 (4:3)
 * @value 320 x 240
 * @option 544 x 416 (17:13)
 * @value 544 x 416
 * @option 640 x 480 (4:3)
 * @value 640 x 480
 * @option 800 x 600 (4:3)
 * @value 800 x 600
 * @option 816 x 624 (17:13)
 * @value 816 x 624
 * @option 1024 x 768 (4:3)
 * @value 1024 x 768
 * @option 1152 x 864 (4:3)
 * @value 1152 x 864
 * @option 1280 x 720 (16:9)
 * @value 1280 x 720
 * @option 1280 x 800 (8:5)
 * @value 1280 x 800
 * @option 1280 x 960 (4:3)
 * @value 1280 x 960
 * @option 1360 x 768 (85:48)
 * @value 1360 x 768
 * @option 1366 x 768 (683:384)
 * @value 1366 x 768
 * @option 1400 x 1050 (4:3)
 * @value 1400 x 1050
 * @option 1440 x 900 (8:5)
 * @value 1440 x 900
 * @option 1600 x 900 (16:9)
 * @value 1600 x 900
 * @option 1600 x 1200 (4:3)
 * @value 1600 x 1200
 * @option 1680 x 1050 (8:5)
 * @value 1680 x 1050
 * @option 1920 x 1080 (16:9)
 * @value 1920 x 1080
 * @option 1920 x 1200 (8:5)
 * @value 1920 x 1200
 * @option 2048 x 1152 (16:9)
 * @value 2048 x 1152
 * @option 2560 x 1440 (16:9)
 * @value 2560 x 1440
 * @option 2560 x 1600 (8:5)
 * @value 2560 x 1600
 *
 * @param Default Graphics Size
 * @text 기본 그래픽 객체 크기
 * @parent Screen Size
 * @type select
 * @desc This parameter allows you to change your default graphics size
 * @default 1280 x 720
 * @option 320 x 240 (4:3)
 * @value 320 x 240
 * @option 544 x 416 (17:13)
 * @value 544 x 416
 * @option 640 x 480 (4:3)
 * @value 640 x 480
 * @option 800 x 600 (4:3)
 * @value 800 x 600
 * @option 816 x 624 (17:13)
 * @value 816 x 624
 * @option 1024 x 768 (4:3)
 * @value 1024 x 768
 * @option 1152 x 864 (4:3)
 * @value 1152 x 864
 * @option 1280 x 720 (16:9)
 * @value 1280 x 720
 * @option 1280 x 800 (8:5)
 * @value 1280 x 800
 * @option 1280 x 960 (4:3)
 * @value 1280 x 960
 * @option 1360 x 768 (85:48)
 * @value 1360 x 768
 * @option 1366 x 768 (683:384)
 * @value 1366 x 768
 * @option 1400 x 1050 (4:3)
 * @value 1400 x 1050
 * @option 1440 x 900 (8:5)
 * @value 1440 x 900
 * @option 1600 x 900 (16:9)
 * @value 1600 x 900
 * @option 1600 x 1200 (4:3)
 * @value 1600 x 1200
 * @option 1680 x 1050 (8:5)
 * @value 1680 x 1050
 * @option 1920 x 1080 (16:9)
 * @value 1920 x 1080
 * @option 1920 x 1200 (8:5)
 * @value 1920 x 1200
 * @option 2048 x 1152 (16:9)
 * @value 2048 x 1152
 * @option 2560 x 1440 (16:9)
 * @value 2560 x 1440
 * @option 2560 x 1600 (8:5)
 * @value 2560 x 1600
 *
 * @help
 * =============================================================================
 * Installations
 * =============================================================================
 * Step1. Download the plugin and the extension program for Win32
 * Step2. Put displaySettings.exe file in your project ./js/libs folder.
 * Step3. Open the Plugin Managers and then set up this plugin.
 * Step4. Deploy your project by Windows platform.
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * ScreenManager Start
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.04 (v1.0.0) - First Release.
 * 2016.10.24 (v1.0.1) - Added Resolution Button in Option.
 * 2016.11.26 (v1.0.2) - Added the function that recreates the scene.
 * 2017.05.28 (v1.0.3) - Added a new feature that the game screen size changes
 * automatically depending on an aspect ratio of the screen on mobile device.
 * 2017.05.29 (v1.0.4) - Added a new feature that can apply a custom aspect ratio.
 * 2017.05.30 (v1.0.5) :
 * - Added a new feature that is resized the game screen when starting the game.
 * - Fixed the problem that is not fitted a size of the background image
 * to a new screen size after resizing the screen.
 * 2017.05.30 (v1.0.6) :
 * - Fixed the function to get the width or the height of the screen on mobile.
 * - Added a new feature that relatively changes the area of the UI.
 * 2017.06.12 (v1.0.7) :
 * - Fixed the parameter about default screen width and height.
 * - Fixed an issue to incorrect scale the background (Scene_Title, Scene_MenuBase, Scene_Gameover)
 * - Fixed the default value of the 'Resize All Windows' parameter is to false.
 * 2017.11.24 (v1.0.8) :
 * - Fixed some issues that are not working in RMMV 1.6.0 (Beta)
 * - Now this plugin doesn't use the node webkit extension.
 */

var RS = RS || {};
RS.ScreenManager = RS.ScreenManager || {};
RS.ScreenManager.Params = RS.ScreenManager.Params || {};

(function ($) {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenManager>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var getTargetRegex = /(\d+)[ ]x[ ](\d+)/i;
  var options = {};
  var settings = {};

  options.resize = Boolean(parameters['isGraphicsRendererResize'] === 'true');
  options.autoScaling = Boolean(parameters['isGraphicsRendererResize'] === 'true');
  options.minWidth = Boolean(parameters['isMaintainingMinimumWidth'] === 'true');
  options.minHeight = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
  options.recreate = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
  options.allResolutions = Boolean(parameters['Use All Resolutions'] === 'true');
  options.aspectRatio = Boolean(parameters['Enable Custom Aspect Ratio'] === 'true');
  settings.customAspectRatio = parameters['Custom Aspect Ratio'] || "16:9";
  settings.customAspectRatio = settings.customAspectRatio.trim().split(":");
  settings.ptCustomScreenSize = String(parameters["Default Screen Size"] || '1280 x 720').split(' x ');
  settings.defaultScreenSize = new Point(
    (parseInt(settings.ptCustomScreenSize[0]) || 1280),
    (parseInt(settings.ptCustomScreenSize[1]) || 720));
  settings.pcGraphicsArray = [];
  settings.pcGraphicsTempArray = [
  "640 x 480", "800 x 600", "1024 x 768", "1152 x 864",
  "1280 x 720", "1280 x 800", "1280 x 960", "1360 x 768",
  "1360 x 768", "1366 x 768", "1400 x 1050", "1440 x 900",
  "1600 x 900", "1600 x 1200", "1680 x 1050", "1920 x 1080",
  "1920 x 1200", "2048 x 1152", "2560 x 1440", "2560 x 1600"
  ];
  settings.mobileGraphicsArray = [
  "120 x 160",
  "160 x 240",
  "240 x 320",
  "240 x 400",
  "320 x 480", // 매우 낮음 (!)
  "480 x 800", // 낮음 (!)
  "640 x 960",
  "640 x 1136",
  "720 x 1280", // Galaxy S3 높음 (!)
  "750 x 1334", // iPhone6, iPhone6S
  "768 x 1024",
  "768 x 1280",
  "800 x 1280",
  "1080 x 1920", // iPhone6+, iPhone6S+, Galaxy S4, Galaxy S5 매우 높음(!)
  "1200 x 1920",
  "1242 x 2208",
  "1440 x 2560", // Galaxy S6, Galaxy S7
  "1536 x 2048",
  "1600 x 2560",
  "2048 x 2732", // iPadPro
  ];
  settings.resolutionQualityOnMobile = [
    "320 x 480", // 매우 낮음 (!)
    "480 x 800", // 낮음 (!)
    "720 x 1280", // Galaxy S3 높음 (!)
    "1080 x 1920" // iPhone6+, iPhone6S+, Galaxy S4, Galaxy S5 매우 높음(!)
  ];
  settings.state = "ready";

  $.Params.settings = settings;
  $.Params.options = options;

  //============================================================================
  // PrivateLocalization
  //============================================================================

  var PrivateLocalization = function () {};
  PrivateLocalization.prototype = {
    "code": navigator.language.slice(0, 2),
    "en": {
      "Resolutions": "Resolutions",
      "Aspect Ratio": "Aspect Ratio",
      "Display Resolutions": "Display Resolutions",
      "Full Screen": "Full Screen",
      "NotFoundError": "Couldn't find the program needed to set the resolution",
      "MobileResolutions" : ["Low", "Medium", "High", "Very High"]
    },
    "ko": {
      "Resolutions": "해상도",
      "Aspect Ratio": "종횡비",
      "Display Resolutions": "해상도 목록",
      "Full Screen": "전체 화면",
      "NotFoundError": "해상도 설정에 필요한 프로그램을 찾지 못했습니다",
      "MobileResolutions" : ["낮음", "보통", "높음", "매우 높음"]
    },
    "get": function (type) {
        var lang = this[this.code];
        return (lang) ? lang[type] : this.en[type];
    }
  };

  $.localization = new PrivateLocalization();

  //============================================================================
  // 새로운 자식 프로세스 생성
  //============================================================================

  (function(){
    "use strict";

    if( Utils.isNwjs() ) {

      var path = require('path'),
          fs = require('fs'),
          child_process = require('child_process');

      var base = path.dirname(process.mainModule.filename);

      if(process && process.platform && process.platform === 'win32') {

        var fileName = path.join(base,"js/libs/DisplaySettings.exe");

        // 파일이 존재한다면
        if(fs.existsSync(fileName)) {
          // 프로젝트명을 읽는다.
          var projectName = document.querySelector('title').text;
          // 자식 프로세스를 실행한다.
          var cmdProcess = child_process.exec(`cmd.exe /K ${fileName} /c`);

          settings.pcGraphicsArray = settings.pcGraphicsTempArray;

          cmdProcess.stderr.on('data', function (data) {
            console.log(cmdProcess + " : " + data);
          });

          cmdProcess.stdout.on('data', function(data) {
            settings.pcGraphicsArray = data.split('\n').filter(function(i, idx, item) {
              return item.indexOf(i) === idx;
            });
            settings.state = "initialized";
          });

          process.on('exit', function () {
            cmdProcess.exec('taskkill /pid ' + cmdProcess.pid + ' /T /F');
          });

          // 페이지를 떠날 때 물어보는 것. 주석을 해제하면 정말 물어본다.
          window.addEventListener('beforeunload', function (ev) {
            cmdProcess.kill();
            // ev.returnValue = "페이지를 정말 떠나시겠습니까?";
            return "\o/";
          }, false);

        } else {
          window.alert($.localization.get("NotFoundError"));
          settings.state = "failed";
          // 기본 해상도로 설정
          settings.pcGraphicsArray = settings.pcGraphicsTempArray;
        }

      } else {
        // in case of Mac OS
        settings.pcGraphicsArray = settings.pcGraphicsTempArray;

      }
    }

  })();

  //============================================================================
  // ScreenConfig
  //============================================================================

  function ScreenConfig() {
    this.initialize.apply(this, arguments);
  };

  ScreenConfig.prototype.constructor = ScreenConfig;
  ScreenConfig.prototype.initialize = function (originWidth, originHeight, orientation) {
    this._originWidth = originWidth;
    this._originHeight = originHeight;
    this._orientation = orientation;
    this._aspectRatio = this.getRatio(originWidth, originHeight);
  };

  ScreenConfig.prototype.gcd = function (p, q) {
    var self = this;
    if(q === 0) return p;

    return this.gcd(q, p % q);

  };

  ScreenConfig.prototype.getSize = function (virtualWidth) {
    var ret, w, h;

    w = parseInt(virtualWidth);
    h = parseInt(this.getHeight(virtualWidth));
    ret = [w, h];

    return ret;
  };

  ScreenConfig.prototype.getRatio = function (width, height) {
    var gcd, ret;
    if(width === height) return [1, 1];
    gcd = this.gcd(width, height);
    ret = [(width / gcd), (height / gcd)];
    return ret;
  };

  ScreenConfig.prototype.getRatioAsString = function (width, height) {
    var gcd, temp, ret;
    if(width === height) return [1, 1];
    if(width < height) {
      temp = width;
      width = height;
      height = temp;
    }
    gcd = this.gcd(width, height);
    ret = Number(width / gcd) + ':' + Number(height / gcd);

    return ret;

  };

  ScreenConfig.prototype.getWidth = function (newHeight) {
    var ar = this._aspectRatio;
    var ratio = parseFloat(ar[0] / ar[1]);

    return ratio * newHeight;

  };

  ScreenConfig.prototype.getHeight = function (newWidth) {
    var ar = this._aspectRatio;
    var ratio = parseFloat(ar[1] / ar[0]);

    return ratio * newWidth;

  };

  //============================================================================
  // CustomScreenConfig
  //============================================================================
  function CustomScreenConfig() {
    this.initialize.apply(this, arguments);
  };

  CustomScreenConfig.prototype = Object.create(ScreenConfig.prototype);
  CustomScreenConfig.prototype.constructor = CustomScreenConfig;

  CustomScreenConfig.prototype.initialize = function (a, b) {
    // We don't need parameters,
    // But it is just for calling the constructor of corresponding superclass.
    ScreenConfig.prototype.initialize.call(this, 1600, 900, 'landscape');
    a = a || 16;
    b = b || 9;
    this._aspectRatio = [a, b];
  };

  //============================================================================
  // Point
  //============================================================================
  Point.prototype.toString = function () {
    return this.x + ' x ' +  this.y;
  };

  //============================================================================
  // Graphics
  //============================================================================

  Graphics.getAvailGraphicsArray = function (returnType) {
    var data, tw, th, pt, gArray, result, maxSW, maxSH, type;
    var orientation, config, aspectRatio;
    var temp, ret;

    gArray = [];
    result = [];

    // availWidth : OS의 상태바나 작업 표시줄을 제외한 높이
    maxSW = Utils.isMobileDevice() ? window.outerWidth : window.screen.availWidth;
    maxSH = Utils.isMobileDevice() ? window.outerHeight : window.screen.availHeight;

    // 화면 방향을 구한다.
    if(Utils.isNwjs()) {
      type = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) type = 'landscape';
    } else {
      type = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }

    data = (Utils.isNwjs()) ? settings.pcGraphicsArray : settings.resolutionQualityOnMobile;
    if( Utils.isMobileDevice()) data = settings.mobileGraphicsArray;

    // Set a custom aspect ratio
    config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);

    data.forEach(function (i) {
      if(i.match(getTargetRegex)) {

        tw = Number(RegExp.$1);
        th = Number(RegExp.$2);

        if(type === 'portrait') {
          if(maxSW > maxSH) {
            var temp = tw;
            tw = th;
            th = temp;
          }
        }

        if(tw >= 0 && tw <= maxSW && th >= 0 && th <= maxSH) {

          // The screen size will convert to fit an aspect ratio of the wide screen.
          if(options.aspectRatio) {
            temp = config.getSize(tw);
            tw = temp[0];
            th = temp[1];
          }

          pt = new Point(tw, th);
          gArray.push(pt);
          result.push(pt.toString());

        } else {

          if(options.allResolutions) {

            // The screen size will convert to fit an aspect ratio of the wide screen.
            if(options.aspectRatio) {
              temp = config.getSize(tw);
              tw = temp[0];
              th = temp[1];
            }

            pt = new Point(tw, th);
            gArray.push(pt);
            result.push(pt.toString());

          }

        }
      }
    }, this);

    return (returnType === 'String')? result : gArray;

  };

  Graphics.getOrientation = function (inner) {
    var maxSW = (inner === true) ? window.innerWidth : window.screen.availWidth;
    var maxSH = (inner === true) ? window.innerHeight : window.screen.availHeight;
    var orientation = 'landscape';
    if(Utils.isNwjs() || !screen.orientation) {
      orientation = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) orientation = 'landscape';
    } else {
      orientation = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }
    return orientation;
  };

  Graphics.setScreenResize = function (newScr) {
    var cx, cy, xPadding, yPadding;
    var tw, th, minW, minH;
    var orientation, config, aspectRatio;
    var maxSW, maxSH;
    var temp;

    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    // Get an orientation in your screen
    orientation = this.getOrientation(false);

    // Get an aspect ratio of a new screen size.
    config = new ScreenConfig(newScr.x, newScr.y, orientation);
    aspectRatio = config._aspectRatio || [17, 13];

    if(options.aspectRatio) {
      config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);
      aspectRatio = config._aspectRatio;
      temp = config.getSize(newScr.x);
      newScr.x = temp[0];
      newScr.y = temp[1];
    }

    SceneManager._screenWidth       = newScr.x;
    SceneManager._screenHeight      = newScr.y;
    SceneManager._boxWidth          = newScr.x;
    SceneManager._boxHeight         = newScr.y;

    // 화면 중앙 좌표
    cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    cy = (window.screen.availHeight / 2) - (newScr.y / 2);

    // 화면 패딩
    xPadding = window.outerWidth - window.innerWidth;
    yPadding = window.outerHeight - window.innerHeight;

    // 타일 크기
    tw = ($gameMap && $gameMap.tileWidth) ? $gameMap.tileWidth() : 48;
    th = ($gameMap && $gameMap.tileHeight) ? $gameMap.tileHeight() : 48;

    // 최소 크기
    minW = (tw * aspectRatio[0]) || Graphics._renderer.width;
    minH = (th * aspectRatio[1]) || Graphics._renderer.height;

    // 화면 크기를 절대 값으로 지정
    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);

    // 중앙으로 위치를 변경한다.
    if(Utils.isNwjs()) {
      if(!nw) var nw = require("nw.gui");
      var win = nw.Window.get();
      win.setPosition("center");
    }

    // 해상도 최소값 & 최대값 설정 부분, 자동으로 조절하는 것에 맞겼다면.
    if(options.autoScaling && (tw/th >= 1.0) && tw >= 48) {

      // 새로운 해상도 값이 최소값(tileWidth * aspectRatio) 값보다 작으면 해상도를 최소값으로 제한한다.
      if(options.minWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
      if(options.minHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);

      // 최소 최대 제한이 없을 경우,
      if(!options.minWidth && !options.minHeight) {
        Graphics.width = Graphics.boxWidth = newScr.x.clamp(minW, window.outerWidth);
        Graphics.height = Graphics.boxHeight = newScr.x.clamp(minH, window.outerHeight);
      }

    } else {
      // 그냥 설정한다.
      Graphics.width = Graphics.boxWidth = newScr.x;
      Graphics.height = Graphics.boxHeight = newScr.y;
    }

    // 렌더러 사이즈를 재설정한다.
    if(options.resize) {
        Graphics._renderer.resize(newScr.x, newScr.y);
    }

    // 현재 씬을 처음부터 다시 생성한다. (저장되지 않은 정보는 잃을 수도 있다)
    if(options.recreate && !(SceneManager._scene instanceof Scene_Boot)) {
      if(SceneManager._scene) SceneManager.push(SceneManager._scene.constructor);
    }

  };

  /**
   * Community_Basic 플러그인의 기본 동작을 해제합니다.
   */
  if(PluginManager._scripts.contains("Community_Basic")) {
    SceneManager.initNwjs = function() {
        if (Utils.isNwjs()) {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            if (process.platform === 'darwin' && !win.menu) {
                var menubar = new gui.Menu({ type: 'menubar' });
                var option = { hideEdit: true, hideWindow: true };
                menubar.createMacBuiltin('Game', option);
                win.menu = menubar;
            }
        }
    };
  };

  /**
   * YEP_CoreEngine 및 ScreenResolution의 기본 동작을 해제합니다.
   */
  if( SceneManager.run.toString().match(/Yanfly/i) ) {
    SceneManager.run = function(sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);
            this.requestUpdate();
        } catch (e) {
            this.catchException(e);
        }
    };
  }

  //============================================================================
  // Scene_Boot
  //============================================================================

  var alias_Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function () {
    alias_Scene_Boot_create.call(this);
    SceneManager.initResolution();
  };

  //============================================================================
  // SceneManager
  //============================================================================

  SceneManager.initResolution = function() {
    var self = this;
    var type, size, orientation, config, mobile;
    var sw, sh, bw, bh;
    var maxSW, maxSH;
    var defScrWidth, defScrHeight;

    maxSW = window.innerWidth;
    maxSH = window.innerHeight;

    // 기본 해상도
    defScrWidth = settings.defaultScreenSize.x;
    defScrHeight = settings.defaultScreenSize.y;

    // 화면 방향에 따른 비율값을 구한다
    orientation = Graphics.getOrientation(true);
    config = new ScreenConfig(maxSW, maxSH, orientation);

    // 모바일에서는 비율 값에 따라 해상도를 변경한다.
    size = config.getSize(defScrWidth);

    mobile = !Utils.isNwjs();
    sw = (mobile === true) ? size[0] : defScrWidth;
    sh = (mobile === true) ? size[1] : defScrHeight;
    bw = (mobile === true) ? size[0] : defScrWidth;
    bh = (mobile === true) ? size[1] : defScrHeight;

    // PC라면 해상도 조절 함수를 호출한다.
    if(Utils.isNwjs()) {
      var newSize = new Point(sw, sh);
      Graphics.setScreenResize(newSize);
    }

    Graphics.width = sw;
    Graphics.height = sh;
    Graphics.boxWidth = sw;
    Graphics.boxHeight = sh;

  };

  var alias_Graphics_onWindowResize = Graphics._onWindowResize;
  Graphics._onWindowResize = function() {
    alias_Graphics_onWindowResize.call(this);
    if(Utils.isNwjs()) {
      // var canvas = document.querySelector('canvas');
      // var dx = parseInt(canvas.style.width);
      // var dy = parseInt(canvas.style.height);
      // var xPadding = window.outerWidth - window.innerWidth;
      // var yPadding = window.outerHeight - window.innerHeight;
      // var cx = (window.screen.availWidth / 2) - (Graphics.boxWidth / 2);
      // var cy = (window.screen.availHeight / 2) - (Graphics.boxHeight / 2);
      // if(dx !== Graphics.boxWidth) {
      //   var mx = (Graphics.boxWidth - dx);
      //   var my = (Graphics.boxHeight - dy);
      //   window.resizeTo(
      //     parseInt(Graphics.boxWidth - mx + xPadding),
      //     parseInt(Graphics.boxHeight - my + yPadding)
      //   );
      // }
      // if(!nw) var nw = require("nw.gui");
      // var win = nw.Window.get();
      // win.setPosition("center");
    }
  };

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._lastScreenManagerItem = 0;
  };

  //============================================================================
  // Window_Options
  //============================================================================

  var alias_Window_Options_initialize = Window_Options.prototype.initialize;
  Window_Options.prototype.initialize = function() {
    alias_Window_Options_initialize.call(this);
    this._lastIndex = $gameSystem._lastScreenManagerItem || 0;
  };

  Window_Options.prototype.isResolution = function (symbol) {
    return symbol.contains('Resolutions');
  };

  Window_Options.prototype.isAspectRatio = function (symbol) {
    return symbol.contains('Aspect Ratio');
  };

  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        if(this.isResolution( symbol ) ) {
          SceneManager.push( ScreenManager );
        } else {
          this.changeValue(symbol, !value);
        }
    }
  };

  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else {
      // 해상도 조절
      if(this.isResolution( symbol ) ) {
        idx = this._lastIndex;
        var item;

        // PC라면 해상도 표시
        if(Utils.isNwjs()) {
          item = Graphics.getAvailGraphicsArray('String');
          item.push($.localization.get("Full Screen"));
        } else {
          // 그외 플랫폼은 낮음, 보통, 높음, 매우 높음으로 표시
          item = $.localization.get("MobileResolutions");
        }

        // index 값이 없으면 현재 해상도 값만 표시
        if(!idx) {
          return String(Graphics.boxWidth + " x " + Graphics.boxHeight);
        } else {
          // 전체 화면이 아니라면,
          if(!Graphics._isFullScreen()) {
            return $.localization.get("Full Screen");
          } else {
            this._lastIndex = idx;
            return item[idx || 0];
          }
        }

      // 종횡비 표시
      } else {
        if( this.isAspectRatio( symbol ) ) {
          return new ScreenConfig(0, 0, '').getRatioAsString(Graphics.boxWidth, Graphics.boxHeight);
        } else {
          return this.booleanStatusText(value);
        }
      }
    }
  };

  var alias_Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
  Window_Options.prototype.addVolumeOptions = function() {
    alias_Window_Options_addVolumeOptions.call(this);
    this.addCommand($.localization.get('Resolutions'), 'Resolutions');
    this.addCommand($.localization.get('Aspect Ratio'), 'Aspect Ratio');
  };

  //============================================================================
  // Window_ResolutionList
  //============================================================================

  function Window_ResolutionList() {
    this.initialize.apply(this, arguments);
  };

  Window_ResolutionList.prototype = Object.create(Window_Selectable.prototype);
  Window_ResolutionList.prototype.constructor = Window_ResolutionList;

  Window_ResolutionList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);

    this.initMembers();
    this.initWithItemPoint();
    this.refresh();
    this.activate();

    this.select($gameSystem._lastScreenManagerItem || 0);

  };

  Window_ResolutionList.prototype.initMembers = function () {
    this._windowFrameSprite.visible = false;

    this._index = 0;
    this._item = [];

  };

  Window_ResolutionList.prototype.lineHeight = function () {
    return Math.round(Graphics.boxHeight / 16);
  };

  Window_ResolutionList.prototype.initWithAspectRatio = function (data) {
    if(options.aspectRatio) {

      var config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);
      var insData = parseInt(window.screen.availWidth / settings.customAspectRatio[0]) * settings.customAspectRatio[0];
      var fullscreenData = config.getSize(insData);

      data.push(new Point(fullscreenData[0], fullscreenData[1]));

    }

    return data;

  };

  Window_ResolutionList.prototype.initWithItemPoint = function () {
    var data = Graphics.getAvailGraphicsArray('Number');
    var ret = [];

    // 배열 내 중복된 데이터를 제거합니다.
    this.uniqWithPoint(data.slice(0), function (newData) {
      ret = newData;
    });

    ret = this.initWithAspectRatio(ret);

    this._itemToPoint = ret;
  };

  Window_ResolutionList.prototype.uniqWithPoint = function (data, callback) {
    var ret = [];
    ret = data.filter(function(e, i, a) {

      if(a[i-1] instanceof Point) {

        if(a[i-1].x === e.x && a[i-1].y === e.y) {

          return false;

        }

        return true;

      } else {

        return true;

      }
    });

    callback(ret);

  };

  Window_ResolutionList.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
  };

  Window_ResolutionList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_ResolutionList.prototype.item = function() {
    return this._data && this._index >= 0 ? this._data[this._index] : null;
  };

  Window_ResolutionList.prototype.makeItemList = function() {
    this._data = Graphics.getAvailGraphicsArray('String');
    if(options.aspectRatio) this._data = this.uniq(this._data.slice(0));
    this._data.push($.localization.get("Full Screen"));
  };

  Window_ResolutionList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
  };

  Window_ResolutionList.prototype.isEnabled = function(item) {
    return !!item;
  };

  Window_ResolutionList.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = this.standardFontSize();
    this.contents.outlineColor = Utils.rgbToCssColor(128, 0, 0);
    this.contents.outlineWidth = 2;
    this.resetTextColor();
  };

  Window_ResolutionList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];

    this.resetTextColor();

    if(text === $.localization.get("Full Screen") && !Graphics._isFullScreen()) {

        this.changeTextColor(this.deathColor());

    }

    this.drawText(text, rect.x, rect.y, rect.width, 'center');

  };

  Window_ResolutionList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

  Window_ResolutionList.prototype.uniq = function (data) {
    data = data.filter(function (e, i, a) {
      return a.indexOf(e) === i;
    }, this);
    return data;
  };

  //============================================================================
  // Window_ResolutionListForMobile
  //============================================================================

  /**
   * PC가 아닌 플랫폼에서는 창 사이즈가 변경되지 않으므로 그래픽 객체 크기를 변경한다.
   * @class Window_ResolutionListForMobile
   */
  function Window_ResolutionListForMobile() {
    this.initialize.apply(this, arguments);
  };

  Window_ResolutionListForMobile.prototype = Object.create(Window_ResolutionList.prototype);
  Window_ResolutionListForMobile.prototype.constructor = Window_ResolutionListForMobile;

  Window_ResolutionListForMobile.prototype.initialize = function (x, y, width, height) {
    Window_ResolutionList.prototype.initialize.call(this, x, y, width, height);
  };

  Window_ResolutionListForMobile.prototype.initWithItemPoint = function () {
    var temp = options.allResolutions;
    var ret, data = Graphics.getAvailGraphicsArray("Number");
    options.allResolutions = temp;

    ret = this.initWithAspectRatio(data);

    this._itemToPoint = ret;
  };

  Window_ResolutionListForMobile.prototype.makeItemList = function() {
    this._data = $.localization.get("MobileResolutions");
  };

  Window_ResolutionListForMobile.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
  };

  Window_ResolutionListForMobile.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];
    this.resetTextColor();
    this.drawText(text, rect.x, rect.y, rect.width, 'center');
  };

  //============================================================================
  // Scene_Base
  //============================================================================

  Scene_Base.prototype.rescaleSprite = function (sprite) {
    if(!sprite.bitmap) return;
    var bitmap = sprite.bitmap;
    var scaleX = Graphics.boxWidth / bitmap.width;
    var scaleY = Graphics.boxHeight / bitmap.height;
    sprite.scale.x = (scaleX > 1.0) ? scaleX : 1.0;
    sprite.scale.y = (scaleY > 1.0) ? scaleY : 1.0;
    sprite.x = Graphics.boxWidth / 2;
    sprite.y = Graphics.boxHeight / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };

  //============================================================================
  // Scene_MenuBase
  //============================================================================

  var alias_Scene_MenuBase_start = Scene_MenuBase.prototype.start;
  Scene_MenuBase.prototype.start = function() {
    alias_Scene_MenuBase_start.call(this);
    this.rescaleSprite(this._backgroundSprite);
  };

  //============================================================================
  // Scene_Title
  //============================================================================

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    alias_Scene_Title_start.call(this);
    this.rescaleSprite(this._backSprite1);
    this.rescaleSprite(this._backSprite2);
  };

  //============================================================================
  // Scene_Gameover
  //============================================================================

  var alias_Scene_Gameover_start = Scene_Gameover.prototype.start;
  Scene_Gameover.prototype.start = function() {
    alias_Scene_Gameover_start.call(this);
    this.rescaleSprite(this._backSprite);
  };

  //============================================================================
  // ScreenManager
  //============================================================================

  function ScreenManager() {
    this.initialize.apply(this, arguments);
  }

  ScreenManager.prototype = Object.create(Scene_Base.prototype);
  ScreenManager.prototype.constructor = ScreenManager;

  ScreenManager.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
  };

  ScreenManager.prototype.create = function () {
    Scene_Base.prototype.create.call(this);

    this.createWindowLayer();
    this.createAvailGraphicsList();
    this.createPanel();

  };

  ScreenManager.prototype.makeSpriteForPanel = function (height) {
    var color1 = Window_Base.prototype.dimColor1();
    var color2 = Window_Base.prototype.dimColor2();
    var x = 0;
    var y = 0;
    var width = Math.floor(Graphics.boxWidth / 3);
    var sprite = new Sprite(new Bitmap(width, height * 2));

    if(navigator.userAgent.match(/Chrome/)) {
      sprite.bitmap.fillAll(color1);
    } else {
      sprite.bitmap.gradientFillRect(x, y, Math.floor(width / 2), height, color2, color1);
      sprite.bitmap.gradientFillRect(Math.floor(x + width / 2), y, Math.floor(width / 2), height, color1, color2);
    }
    sprite.bitmap.drawText($.localization.get("Display Resolutions"), x, y, width, height, 'center');

    return sprite;

  };

  ScreenManager.prototype.createPanel = function () {
    var height = Math.floor(Graphics.boxHeight / 17);
    var nx = this._availGraphicsList.x;
    var ny = this._availGraphicsList.y - height - 10;

    this._panel = this.makeSpriteForPanel(height);
    this.setPosition(this._panel, nx, ny).addChild(this._panel);

  };

  ScreenManager.prototype.setPosition = function (type, x, y) {
    if(!type) return;

    type.x = x;
    type.y = y;

    return this;

  };

  ScreenManager.prototype.setHandler = function () {
    if(!this._availGraphicsList) return;

    this._availGraphicsList.setHandler('ok', this.convertScreenSize.bind(this));
    this._availGraphicsList.setHandler('cancel', this.popScene.bind(this));

    return this;

  };

  ScreenManager.prototype.createDisplayList = function (x, y, width, height) {
    var ClassType = Utils.isNwjs() ? Window_ResolutionList : Window_ResolutionListForMobile;

    return new ClassType(x, y, width, height);

  };

  ScreenManager.prototype.createAvailGraphicsList = function () {
    var width = Math.floor(Graphics.boxWidth / 3);
    var height = Math.floor(Graphics.boxWidth / 2.5);
    var nx = Graphics.boxWidth / 2 - (width / 2);
    var ny = Graphics.boxHeight / 2 - (height / 2);

    this._availGraphicsList = this.createDisplayList(0, 0, width, height);
    this.setPosition(this._availGraphicsList, nx, ny )
      .setHandler()
      .addWindow(this._availGraphicsList);

  };

  ScreenManager.prototype.convertWithAspectRatio = function () {
    var config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);
    var insData = parseInt(window.screen.availWidth / settings.customAspectRatio[0]) * settings.customAspectRatio[0];
    var data = config.getSize(insData);

    Graphics.setScreenResize(new Point(data[0], data[1]));

  };

  ScreenManager.prototype.convertWithNwjs = function () {
    var scr = this._availGraphicsList.getCurrentItemToPoint();

    if(scr) {

      Graphics.setScreenResize(scr);

    } else {

      this.convertWithAspectRatio();

    }

    if(this._availGraphicsList.item() === $.localization.get("Full Screen")) {

      Graphics._switchFullScreen();

    }

  };

  ScreenManager.prototype.convertWithOther = function () {
    var scr = this._availGraphicsList.getCurrentItemToPoint();

    if(scr) {
      var temp = [];
      temp.push(options.aspectRatio);
      temp.push(options.resize);
      options.resize = true;
      options.aspectRatio = true;
      Graphics.setScreenResize(scr);
      options.resize = temp.pop();
      options.aspectRatio = temp.pop();

    } else {

      this.convertWithAspectRatio();
    }
  };

  ScreenManager.prototype.flushScreen = function () {
    $gameSystem._lastScreenManagerItem = this._availGraphicsList.index();

    this.popScene();

  };

  ScreenManager.prototype.convertScreenSize = function () {
    // PC인가?
    if(Utils.isNwjs()) {

      this.convertWithNwjs();

    // 다른 플랫폼인가?
    } else {

      this.convertWithOther();

    }

    // 빠져나간다.
    this.flushScreen();

  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "ScreenManager") {
        switch(args[0]) {
          case 'Start':
            if(Utils.isNwjs()) {
              SceneManager.push(ScreenManager);
            }
            break;
        }
      }
  };

  window.ScreenManager = ScreenManager;

})(RS.ScreenManager);
