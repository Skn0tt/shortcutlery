import { saveAs } from "file-saver";
import { createApp } from "./AppBuilder";

const downloadButton = document.getElementById("download") as HTMLButtonElement;

downloadButton.onclick = onDownload;

async function onDownload() {
  const command = "open https://simonknott.de";
  const appName = "App Shortcut";
  const blob = await createApp(command, appName);
  saveAs(blob, appName + ".zip");
}