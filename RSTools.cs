using System;
using System.Text;
using CefSharp;
using CefSharp.WinForms;
using System.Windows.Forms;
using System.Threading.Tasks;
using System.Threading;
using System.Drawing;
using System.IO;

public class RSTools
{
    private ChromiumWebBrowser browser;
    private CEFGame.Form1 _form;
    private Thread _workerThread;

    private string _windowTitle;
    private Rectangle _windowSize;

    public string WindowTitle
    {
        get { return _windowTitle;  }
        set { _windowTitle = value; }
    }

    public Rectangle WindowSize
    {
        get { return _windowSize; }
        set { _windowSize = value;  }
    }

    public RSTools(ChromiumWebBrowser mainBrowser, CEFGame.Form1 form)
    {
        browser = mainBrowser;
        _form = form;
        InitMembers();
    }

    public void InitMembers()
    {
        _windowTitle = "";
        _windowSize = new Rectangle(0, 0, 816, 624);
    }

    public void SetGameTitle(string content)
    {
        _windowTitle = content;
    }

    public string GetGameTitle()
    {
        return _windowTitle;
    }

    public void SetScreenSize(int width, int height)
    {
        _windowSize.Width = width;
        _windowSize.Height = height;
    }

    public Rectangle GetScreenSize()
    {
        return _windowSize;
    }

    public void ShowMessageBox(string title, string content, IJavascriptCallback yes, IJavascriptCallback no)
    {
        DialogResult result = MessageBox.Show(content, title, MessageBoxButtons.YesNo);
        if(result == DialogResult.Yes)
        {
            yes.ExecuteAsync();
        } else
        {
            no.ExecuteAsync();
        }
    }

    public void UpdateWindowSettings()
    {
        _workerThread = new Thread(new ThreadStart(_form.UpdateWindowSettings));
        _workerThread.Start();
    }

    public void Focus()
    {
        // 작업 쓰레드인가?
        if(browser.InvokeRequired)
        {
            // UI 쓰레드로 포커스 작업 요청
            browser.BeginInvoke(new Action(() => browser.Focus()));
        } else
        {
            browser.Focus();
        }
    }

}
