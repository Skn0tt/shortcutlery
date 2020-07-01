import { saveAs } from "file-saver";
import { createApp } from "./AppBuilder";
import CommandSvg from "./command.svg";
import LinkSvg from "./link_icon.svg";

const actionSelect = document.getElementById("action_select") as HTMLSelectElement;
const specifics = document.getElementById("specifics") as HTMLDivElement;
const specificsIcon = document.getElementById("specifics-icon") as HTMLImageElement;
const actionInput = document.getElementById("action_input") as HTMLInputElement;
const createAppButton = document.getElementById("create_app") as HTMLButtonElement;

function getSelectedAction() {
  return actionSelect.value as "url" | "shell";
}
actionSelect.onchange = () => {
  const specificsText = getSelectedAction() == "shell" ? "which command?" : "which website?";
  const placeholder = getSelectedAction() == "shell" ? "/usr/bin/code ~/dev/" : "https://simonknott.de";
  const specificsImg = getSelectedAction() == "shell" ? CommandSvg : LinkSvg;

  specifics.lastChild.textContent = specificsText;
  specificsIcon.src = specificsImg;
  actionInput.placeholder = placeholder;
}

const nameInput = document.getElementById("name_input") as HTMLInputElement;
const spotlightDiv = document.getElementById("spotlight") as HTMLDivElement;

nameInput.onkeyup = () => {
  updateCreateButtonAvailability();

  const currentName = nameInput.value;
  if (!!currentName) {
    spotlightDiv.classList.remove("small")
  } else {
    spotlightDiv.classList.add("small")
  }
}

actionInput.oninput = () => {
  updateCreateButtonAvailability();
}

function updateCreateButtonAvailability() {
  const actionIsFilledOut = !!actionInput.value;
  const nameIsFilledOut = !!nameInput.value;
  const shallBeEnabled = actionIsFilledOut && nameIsFilledOut;
  createAppButton.disabled = !shallBeEnabled;
}

createAppButton.onclick = async () => {
  if (createAppButton.disabled) {
    return;
  }

  const name = nameInput.value;
  const type = getSelectedAction();
  const action = actionInput.value;
  const command = type === "shell" ? action : `open ${action}`;

  const blob = await createApp(command, name);
  saveAs(blob, name + ".zip");
}