Chrome 的离线 QRCode 生成插件。

基于
- [jquery.qrcode.js][]
- [QR Code Generator][]
- [Pure][]

功能
1. 提供了最基本的扩展工具栏按钮，点击可直接为当前标签的 URL 生成二维码，也输入自定义文本来生成。
2. 支持页面右键菜单，可为当前页面网址，所选文本或所选超链接生成二维码。
3. 使用 Event Pages 技术，只有当需要时（点击右键菜单的时候）才会加载后台进程。
4. Lazy Load 技术注入脚本，只有点击右键菜单生成二维码的时候，才会为当前页面注入脚本，不会对正常浏览网页产生影响。

 Chrome WebStore 下载 [Offline QRCode Generator](https://chrome.google.com/webstore/detail/offline-qrcode-generator/nffnfjmgmedijakadedogccmghenomnk)

[jquery.qrcode.js]: http://larsjung.de/qrcode/
[QR Code Generator]: https://d-project.googlecode.com/svn/trunk/misc/qrcode/index.html
[Pure]: http://purecss.io/
