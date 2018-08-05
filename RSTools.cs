using System;
using System.Text;
using CefSharp;
using CefSharp.WinForms;
using System.Windows.Forms;
using System.Threading.Tasks;
using System.Threading;
using System.Drawing;

public class RSTools
{
    private ChromiumWebBrowser browser;
    private CEFGame.Form1 _form;
    private Thread _thread;

    private string _windowTitle;
    private Rectangle _windowSize;

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
        _thread = new Thread(new ThreadStart(_form.UpdateWindowSettings));
        _thread.Start();
    }

}
