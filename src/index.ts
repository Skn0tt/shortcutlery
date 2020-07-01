import { saveAs } from "file-saver";
import { createApp } from "./AppBuilder";

const nameInput = document.getElementById("name_input") as HTMLInputElement;
console.log(nameInput)
const spotlightDiv = document.getElementById("spotlight") as HTMLDivElement;

nameInput.onkeyup = () => {
  const currentName = nameInput.value;
  if (!!currentName) {
    spotlightDiv.classList.remove("small")
  } else {
    spotlightDiv.classList.add("small")
  }
}

async function onDownload() {
  const command = "open https://simonknott.de";
  const appName = "App Shortcut";
  const blob = await createApp(command, appName);
  saveAs(blob, appName + ".zip");
}