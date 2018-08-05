using System;
using System.Text;
using CefSharp;
using CefSharp.WinForms;
using System.Windows.Forms;
using System.Threading.Tasks;
using System.Threading;

public class RSTools
{
    private ChromiumWebBrowser browser;
    private CEFGame.Form1 _form;
    private Thread _thread;

    public RSTools(ChromiumWebBrowser mainBrowser, CEFGame.Form1 form)
    {
        browser = mainBrowser;
        _form = form;
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
