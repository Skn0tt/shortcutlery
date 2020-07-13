import { saveAs } from "file-saver";
import { createApp } from "./AppBuilder";
import CommandSvg from "./assets/command.svg";
import LinkSvg from "./assets/link_icon.svg";
import { trackEvent } from "./tracking";

const actionSelect = document.getElementById(
  "action_select"
) as HTMLSelectElement;
const specifics = document.getElementById("specifics") as HTMLDivElement;
const specificsIcon = document.getElementById(
  "specifics-icon"
) as HTMLImageElement;
const actionInput = document.getElementById("action_input") as HTMLInputElement;
const createAppButton = document.getElementById(
  "create_app"
) as HTMLButtonElement;
const iconUpload = document.getElementById("icon_upload") as HTMLImageElement;
const iconUploadInput = document.getElementById(
  "icon_upload_input"
) as HTMLInputElement;

iconUpload.onclick = () => {
  iconUploadInput.click();
};

iconUploadInput.onchange = () => {
  const [image] = iconUploadInput.files;
  const objectUrl = URL.createObjectURL(image);
  iconUpload.src = objectUrl;
};

function getSelectedAction() {
  return actionSelect.value as "url" | "shell";
}
actionSelect.onchange = () => {
  const specificsText =
    getSelectedAction() == "shell" ? "which command?" : "which website?";
  const placeholder =
    getSelectedAction() == "shell"
      ? "/usr/bin/code ~/dev/"
      : "https://simonknott.de";
  const specificsImg = getSelectedAction() == "shell" ? CommandSvg : LinkSvg;

  specifics.lastChild.textContent = specificsText;
  specificsIcon.src = specificsImg;
  actionInput.placeholder = placeholder;
};

const nameInput = document.getElementById("name_input") as HTMLInputElement;
const spotlightDiv = document.getElementById("spotlight") as HTMLDivElement;

nameInput.onkeyup = () => {
  updateCreateButtonAvailability();

  const currentName = nameInput.value;
  if (!!currentName) {
    spotlightDiv.classList.remove("small");
  } else {
    spotlightDiv.classList.add("small");
  }
};

actionInput.oninput = () => {
  updateCreateButtonAvailability();
};

function updateCreateButtonAvailability() {
  const actionIsFilledOut = !!actionInput.value;
  const nameIsFilledOut = !!nameInput.value;
  const shallBeEnabled = actionIsFilledOut && nameIsFilledOut;
  createAppButton.disabled = !shallBeEnabled;
}

const notification1 = document.getElementById("notification-1");
const notification2 = document.getElementById("notification-2");

createAppButton.onclick = async () => {
  if (createAppButton.disabled) {
    return;
  }

  trackEvent("shortcutlery", "download");

  const name = nameInput.value;
  const icon: File | undefined = iconUploadInput.files[0];
  const type = getSelectedAction();
  const action = actionInput.value;
  const command = type === "shell" ? action : `open "${action}"`;

  const blob = await createApp(command, name, icon);
  saveAs(blob, name + ".zip");

  notification1.classList.remove("move-right");
  setTimeout(() => {
    notification2.classList.remove("move-right");
  }, 100);
};
