﻿using System;
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

namespace CEFGame
{
    /**
     * 필수 : 로컬 파일 접근
     * https://stackoverflow.com/questions/49745199/why-cefsharp-indicates-not-allowed-to-load-local-resource-file-c 
     * https://www.codeproject.com/Articles/990346/Using-HTML-as-UI-Elements-in-a-WinForms-Applicatio
     */
    public partial class Form1 : Form
    {

        private string m_gameTitle;
        private Rectangle m_screenSize;
        public ChromiumWebBrowser browser;
        public RSTools rsTools;
        delegate void StringArgReturningVoidDelegate();

        public Form1()
        {
            InitializeComponent();
            InitBrowser();
        }

        public void ChangeWindowSettings()
        {
            Task task = new Task(() => {
                // 창 제목을 가져옵니다.
                object js = EvaluateScript(browser, "document.head.getElementsByTagName('title')[0].innerText;");
                // 창의 폭과 높이를 가져옵니다.
                object boxWidth = EvaluateScript(browser, "Graphics.boxWidth;");
                object boxHeight = EvaluateScript(browser, "Graphics.boxHeight;");
                m_gameTitle = js.ToString();
                m_screenSize = new Rectangle(0, 0, Int32.Parse(boxWidth.ToString()), Int32.Parse(boxHeight.ToString()));
            });
            task.Start();
        }

        /**
         * https://docs.microsoft.com/ko-kr/dotnet/framework/winforms/controls/how-to-make-thread-safe-calls-to-windows-forms-controls
         */
        public void UpdateWindowSettings()
        {
            if(this.InvokeRequired)
            {
                StringArgReturningVoidDelegate d = new StringArgReturningVoidDelegate(UpdateWindowSettings);
                this.Invoke(d);
            } else
            {
                // 창 제목을 변경합니다.
                this.Text = m_gameTitle;
                // 창 넓이를 변경합니다.
                this.SetBounds(0, 0, m_screenSize.Width + 16, m_screenSize.Height + 32);
                // 브라우저의 넓이를 변경합니다.
                browser.SetBounds(0, 0, m_screenSize.Width, m_screenSize.Height);
                // 창을 화면 중앙에 위치시킵니다.
                this.CenterToScreen();
            }
        }

        /**
         * 로컬 폴더 경로를 획득합니다.
         */
        public static string GetAppLocation()
        {
            return AppDomain.CurrentDomain.BaseDirectory;
        }

        /**
         * 브라우저를 초기화 합니다.
         */
        public void InitBrowser()
        {
            m_gameTitle = "";

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
            browser.JavascriptObjectRepository.Register("RSTools", rsTools, false);

            browser.BrowserSettings = browserSettings;
            browser.FrameLoadEnd += delegate
            {
                ChangeWindowSettings();
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

        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }

    }
}

