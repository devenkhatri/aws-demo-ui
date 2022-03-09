import fetch from 'node-fetch';
import stream from 'stream';
import { promisify } from 'util';

export default async function handler( req, res ) {
    const { docid } = await req.query;
    console.log("*******", req.query)

    const pipeline = promisify(stream.pipeline);
    const url = 'https://dummyimage.com/600x400&text=DocumentID='+docid;

    const response = await fetch(url); 
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    res.setHeader('Content-Type', 'application/image');
    res.setHeader('Content-Disposition', 'attachment; filename='+docid+'.png');

    await pipeline(response.body, res);
  }
  