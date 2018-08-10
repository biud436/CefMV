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
using System.Globalization;

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
                // Get the window title from the RPG Maker MV
                object windowTitle = EvaluateScript(browser, "document.head.getElementsByTagName('title')[0].innerText;");
                // Get the width and height values from the Graphics object.
                object boxWidth = EvaluateScript(browser, "Graphics.boxWidth;");
                object boxHeight = EvaluateScript(browser, "Graphics.boxHeight;");
                // Set the game title and screen size in Cef.
                rsTools.SetGameTitle(windowTitle.ToString());
                rsTools.SetScreenSize(Int32.Parse(boxWidth.ToString()), Int32.Parse(boxHeight.ToString()));

            });
            task.Start();
            
        }

        public void UpdateWindowSettings()
        {
            // Is it the worker thread?
            if (this.InvokeRequired)
            {
                StringArgReturningVoidDelegate d = new StringArgReturningVoidDelegate(UpdateWindowSettings);
                // Request the UI thread.
                this.Invoke(d);
            } else
            {
                //Is it the UI thread?

                // Change the window name.
                this.Text = rsTools.GetGameTitle();
                Rectangle rect = rsTools.GetScreenSize();

                // Adjust the client area. (for removing the scrollbar)
                this.ClientSize = new Size(rect.Width, rect.Height);
                browser.ClientSize = new Size(rect.Width, rect.Height);

                // Set the window position in the display.
                this.CenterToScreen();
                // The focus can get only in an UI thread, not worker thread (it's very strict.)
                rsTools.Focus();

                // Check the platform.
                EvaluateScript(browser, @"Utils.isCef = function() { 
                    return true; 
                };");

            }
        }

        /**
         * Get the path of the local folder
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
         * Initialize the browser.
         */
        public void InitBrowser()
        {
            CefSettings settings = new CefSettings();
            settings.Locale = GetLanguageCode();
            settings.MultiThreadedMessageLoop = true;
            settings.RemoteDebuggingPort = 8080;
            //settings.CefCommandLineArgs.Add("remote-debugging-port", "8080");

            Cef.EnableHighDPISupport();

            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            Cef.Initialize(settings);

            // Set the authority to access local files.
            var browserSettings = new BrowserSettings
            {
                FileAccessFromFileUrls = CefState.Enabled,
                UniversalAccessFromFileUrls = CefState.Enabled,
                DefaultEncoding = "UTF-8",
            };

            // Create the browser object.
            browser = new ChromiumWebBrowser(string.Format("file:///{0}www/index.html", GetAppLocation()));

            //browser.JsDialogHandler = new JsDialogHandler();

            // Create a new javascript object that can call the C# API.
            // We should access the object called 'RSTools' (Changed camelCase)
            rsTools = new RSTools(browser, this);
            _soundManager = new SoundManager();
            browser.JavascriptObjectRepository.Register("RSTools", rsTools, false);
            browser.JavascriptObjectRepository.Register("RSAudio", _soundManager, false);
            browser.ClientSize = new Size(816, 624);
            browser.BrowserSettings = browserSettings;
            browser.FrameLoadEnd += (sender, args) =>
            {
                if (args.Frame.IsMain)
                {
                    ChangeWindowSettings();
                    DialogResult ret = MessageBox.Show("Open Developer Tools?", "Help", MessageBoxButtons.OKCancel);
                    if(ret == DialogResult.OK)
                    {
                        browser.ShowDevTools();
                    }
                    browser.GetMainFrame().ExecuteJavaScriptAsync("alert('CefMV has initialized')");
                }
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

        public string GetLanguageCode()
        {
            return CultureInfo.CurrentCulture.Name;
        }

        private void Browser_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
        {
            browser.ShowDevTools();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.ClientSize = new Size(816, 624);
            this.CenterToScreen();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            _soundManager.Dispose();   
        }

    }
}

