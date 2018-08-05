using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using System.Text;

public class RSTools
{
    private ChromiumWebBrowser browser;

    public RSTools(ChromiumWebBrowser mainBrowser)
    {
        browser = mainBrowser;
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
}
