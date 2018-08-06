using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using NAudio.Wave;
using NAudio.Vorbis;
using System.Threading;

namespace CEFGame
{
    public partial class Form1 : Form
    {

        public ChromiumWebBrowser browser;
        public RSTools rsTools;
        delegate void StringArgReturningVoidDelegate();

        private SoundManager _soundManager = null;

        public Form1()
        {
            InitializeComponent();
            InitBrowser();
        }

        public void ChangeWindowSettings()
        {
            Task task = new Task(() => {
                // 창 제목을 가져옵니다.
                object windowTitle = EvaluateScript(browser, "document.head.getElementsByTagName('title')[0].innerText;");
                // 창의 폭과 높이를 가져옵니다.
                object boxWidth = EvaluateScript(browser, "Graphics.boxWidth;");
                object boxHeight = EvaluateScript(browser, "Graphics.boxHeight;");
                rsTools.SetGameTitle(windowTitle.ToString());
                rsTools.SetScreenSize(Int32.Parse(boxWidth.ToString()), Int32.Parse(boxHeight.ToString()));

            });
            task.Start();
            
        }

        public void UpdateWindowSettings()
        {
            // UI 컨트롤이 작업 쓰레드에서 돌고 있는가?
            if (this.InvokeRequired)
            {
                StringArgReturningVoidDelegate d = new StringArgReturningVoidDelegate(UpdateWindowSettings);
                // UI 쓰레드에 작업 (다른 쓰레드에서 작업 불가, 엄격함)
                this.Invoke(d);
            } else
            {
                //UI 쓰레드인가?

                // 창 제목을 변경합니다.
                this.Text = rsTools.GetGameTitle();
                Rectangle rect = rsTools.GetScreenSize();
                // 창 넓이를 변경합니다.
                this.SetBounds(0, 0, rect.Width + 16, rect.Height + 32);
                // 브라우저의 넓이를 변경합니다.
                browser.SetBounds(0, 0, rect.Width, rect.Height);
                // 창을 화면 중앙에 위치시킵니다.
                this.CenterToScreen();
                // 포커스를 획득합니다 (UI 쓰레드에서만 포커스 획득 가능)
                rsTools.Focus();

                // 오디오 파일을 재생합니다.
                _soundManager.Load(string.Format(@"{0}www\audio\bgm\deepnight.ogg", GetAppLocation()), "m", SoundManager.SoundType.MUSIC);
                _soundManager.PlayMusic("m", false);
            }
        }

        /**
         * 로컬 폴더 경로를 획득합니다.
         */
        public static string GetAppLocation()
        {
            return AppDomain.CurrentDomain.BaseDirectory;
        }

        public static string GetCurrentDirectory()
        {
            string currentDirName = System.IO.Directory.GetCurrentDirectory();
            return currentDirName;
        }

        /**
         * 브라우저를 초기화 합니다.
         */
        public void InitBrowser()
        {
            CefSettings setttings = new CefSettings();
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            Cef.Initialize(setttings);

            // 로컬 파일에 접근 가능하게 설정합니다.
            var browserSettings = new BrowserSettings
            {
                FileAccessFromFileUrls = CefState.Enabled,
                UniversalAccessFromFileUrls = CefState.Enabled
            };

            // 브라우저를 생성합니다.
            browser = new ChromiumWebBrowser(string.Format("file:///{0}www/index.html", GetAppLocation()));

            // C# API 호출을 위한 자바스크립트 객체를 만듭니다.
            // RSTools로 접근할 수 있습니다(camelCase로 변경됩니다)
            rsTools = new RSTools(browser, this);
            _soundManager = new SoundManager();
            browser.JavascriptObjectRepository.Register("RSTools", rsTools, false);
            browser.JavascriptObjectRepository.Register("RSAudio", _soundManager, false);
            browser.SetBounds(0, 0, 800, 600);
            browser.BrowserSettings = browserSettings;
            browser.FrameLoadEnd += delegate
            {
                ChangeWindowSettings();
                browser.ShowDevTools();
            };

            browser.Dock = DockStyle.Fill;

            this.Controls.Add(browser);

        }

        static object EvaluateScript(ChromiumWebBrowser b, string script)
        {
            var task = b.EvaluateScriptAsync(script);
            task.Wait();
            JavascriptResponse response = task.Result;
            return response.Success ? (response.Result ?? "") : response.Message;
        }

        private void Browser_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
        {
            browser.ShowDevTools();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.SetBounds(0, 0, 816 + 16, 624 + 32);
            this.CenterToScreen();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            _soundManager.Dispose();   
            Cef.Shutdown();
        }

    }
}

