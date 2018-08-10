using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;

public class JsDialogHandler : IJsDialogHandler
{

    public void OnDialogClosed(IWebBrowser browserControl, IBrowser browser)
    {

    }

    public bool OnJSBeforeUnload(IWebBrowser browserControl, IBrowser browser, string message, bool isReload, IJsDialogCallback callback)
    {
        return true;
    }

    public bool OnJSDialog(IWebBrowser browserControl, IBrowser browser, string originUrl, CefJsDialogType dialogType, string messageText, string defaultPromptText, IJsDialogCallback callback, ref bool suppressMessage)
    {
        MessageBox.Show(messageText, originUrl);
        return true;
    }

    public void OnResetDialogState(IWebBrowser browserControl, IBrowser browser)
    {

    }

}
