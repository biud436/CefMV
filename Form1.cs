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

namespace CEFGame
{
    /**
     * 필수 : 로컬 파일 접근
     * https://stackoverflow.com/questions/49745199/why-cefsharp-indicates-not-allowed-to-load-local-resource-file-c 
     * https://www.codeproject.com/Articles/990346/Using-HTML-as-UI-Elements-in-a-WinForms-Applicatio
     */
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public static string GetAppLocation()
        {
            return AppDomain.CurrentDomain.BaseDirectory;
        }

        public ChromiumWebBrowser browser;
        public RSTools rsTools;

        public void InitBrowser()
        {
            CefSettings setttings = new CefSettings();
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            Cef.Initialize(setttings);
            browser = new ChromiumWebBrowser(string.Format("file:///{0}www/index.html", GetAppLocation()));
            var browserSettings = new BrowserSettings
            {
                FileAccessFromFileUrls = CefState.Enabled,
                UniversalAccessFromFileUrls = CefState.Enabled
            };
            browser.BrowserSettings = browserSettings;
            browser.FrameLoadEnd += Browser_FrameLoadEnd;
            rsTools = new RSTools(browser);
            browser.JavascriptObjectRepository.Register("RSTools", rsTools, false);
            this.Controls.Add(browser);
            browser.Dock = DockStyle.Fill;
        }

        private void Browser_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
        {
            browser.ShowDevTools();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.SetBounds(0, 0, 1280, 720);
            this.CenterToScreen();
            InitBrowser();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }

    }
}

