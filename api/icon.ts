import sharp from 'sharp';

export default async function handler(req: any, res: any) {
  try {
    const requestedSize = Number.parseInt(String(req.query?.size || '512'), 10);
    const size = [32, 64, 128, 180, 192, 256, 512, 1024].includes(requestedSize)
      ? requestedSize
      : 512;

    const protocol = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
    const host = req.headers.host;

    if (!host) {
      res.status(400).send('Missing host');
      return;
    }

    const sourceUrl = `${protocol}://${host}/ruru-icon.svg`;
    const response = await fetch(sourceUrl);

    if (!response.ok) {
      throw new Error(`Unable to load icon source: ${response.status}`);
    }

    const svg = Buffer.from(await response.arrayBuffer());
    const png = await sharp(svg)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Disposition', `inline; filename="ruru-icon-${size}.png"`);
    res.status(200).send(png);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to generate app icon');
  }
}
