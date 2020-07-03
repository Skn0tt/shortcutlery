import { IcnsImage, Icns } from '@fiahfy/icns';

function resizeTo512x512(file: File) {
  const canvas = document.createElement("canvas") as HTMLCanvasElement
  canvas.height = 512;
  canvas.width = 512;
  const canvasCtx = canvas.getContext("2d")

  return new Promise<Buffer>(resolve => {
    const img = new Image();
    img.onload = () => {
      canvasCtx.drawImage(img, 0, 0, 512, 512)

      const [_, b64] = canvas.toDataURL().split("base64,")
      resolve(Buffer.from(b64, "base64"));
    }
    img.src = URL.createObjectURL(file);
  })
}

export async function createAppIcon(file: File) {
  const resizedImage = await resizeTo512x512(file);

  const icns = new Icns()
  icns.append(
    IcnsImage.fromPNG(resizedImage, "ic09")
  );

  return icns.data
}