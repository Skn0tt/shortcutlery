import JSZip from "jszip";
import { saveAs } from "file-saver";
import ApplicationStubURL from "./template/Contents/MacOS/ApplicationStub.file";
import DocumentWflowURL from "./template/Contents/document.wflow";
import InfoPlistURL from "./template/Contents/Info.plist";

const downloadButton = document.getElementById("download") as HTMLButtonElement;

downloadButton.onclick = onDownload;

async function createZip(command: string) {
  const zip = new JSZip();
  const App = zip.folder("Foam Opener.app")
  const Contents = App.folder("Contents");
  const [ApplicationStub, DocumentWflow, InfoPlist] = await Promise.all([
    fetch(ApplicationStubURL).then(r => r.blob()),
    fetch(DocumentWflowURL).then(r => r.text()),
    fetch(InfoPlistURL).then(r => r.text()),
  ])
  console.log(ApplicationStub)
  Contents.file("MacOS/Application Stub", ApplicationStub, { unixPermissions: "0751", binary: true, optimizedBinaryString: true });
  Contents.file("document.wflow", DocumentWflow)
  Contents.file("Info.plist", InfoPlist)
  return zip;
}

async function downloadZip(zip: JSZip, filename: string) {
  const blob = await zip.generateAsync({ platform:'UNIX', type: "blob" });
  saveAs(blob, filename);
}

async function onDownload() {
  const zip = await createZip("/dev")
  await downloadZip(zip, "Foam Opener.zip");
}