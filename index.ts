import { Uppload, en, Local, Crop, Camera, Instagram } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

const uploader = new Uppload({
  lang: en,  // 言語指定
  call: ".pure-button-primary",  // 呼び出し元
  bind: ".uppload-image",  // 表示先
  value: "https://via.placeholder.com/150x150",  // 初期プレースホルダー画面
  uploader: (file, updateProgress) =>
    new Promise(resolve => {
      console.log("Uploading file...", file);
      setTimeout(() => resolve(window.URL.createObjectURL(file)), 2750);
      let progress = 0;
      const interval = setInterval(() => {
        if (progress > 99) clearInterval(interval);
        if (updateProgress) updateProgress(progress++);
      }, 25);
    })
});

// Services
uploader.use([
  new Local({maxFileSize: 1000000}),
  new Camera(),
  new Instagram()
]);

// Effects
uploader.use([new Crop({ aspectRatio: 1 })]);

// Logging
console.log(uploader);
uploader.on("*", (...params: any[]) => {
  console.log(params);
});