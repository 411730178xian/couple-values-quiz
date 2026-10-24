// 偵測 LINE、Instagram、Facebook 等 App 內建瀏覽器。
// 這些瀏覽器常常擋下檔案下載，所以在頁面頂端提示改用系統瀏覽器開啟。
(function () {
  const ua = navigator.userAgent || "";
  const isLine = / Line\//i.test(ua);
  const inApp = isLine || /FBAN|FBAV|FB_IAB|Instagram|Messenger|MicroMessenger|KAKAOTALK|Threads|BytedanceWebview|musical_ly/i.test(ua);
  window.IN_APP_BROWSER = inApp;
  if (!inApp) return;

  const box = document.createElement("div");
  box.className = "card inapp no-print";
  let action = "";
  if (isLine) {
    const url = new URL(location.href);
    url.searchParams.set("openExternalBrowser", "1");
    action = `<a class="btn" href="${url.href}">用系統瀏覽器開啟</a>`;
  }
  box.innerHTML = `
    <strong>你正在 App 內建的瀏覽器中開啟這個網頁</strong>
    <p>LINE、Instagram、Facebook 等 App 的內建瀏覽器常常無法下載檔案。建議點右上角「⋯」或分享圖示，選擇「在 Safari／Chrome 中開啟」或「用預設瀏覽器開啟」後再填寫。</p>
    <p class="muted">如果已經在這裡填完，也沒關係：完成後可以改用「複製答案」把答案貼到分析頁。注意：換到其他瀏覽器後，這裡的暫存作答不會跟著過去。</p>
    ${action}`;
  const wrap = document.querySelector(".wrap");
  wrap.insertBefore(box, wrap.children[1]);
})();
