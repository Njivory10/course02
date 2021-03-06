import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
require('dotenv').config();

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  
  /**************************************************************************** */

  let filteredpath: string; //assign temp variable to store filtered path string
  let filteredpathstemp: Array<string>; //create string array to store list of filtered paths that will be deleted

 // GET /filteredimage?image_url={{URL}}
 app.get( "/filteredimage/", async ( req:express.Request, res:express.Response) => {
  let { image_url } = req.query;
  
  if ( !image_url ) {
    return res.status(400)
              .send(`An image URL is required`);
  }

filteredpath = await filterImageFromURL(image_url); //return greyscale image path

filteredpathstemp.push(filteredpath);
deleteLocalFiles(filteredpathstemp); 

  return res.status(200)
              .sendFile((filteredpath));
  
} );
  
// // GET /filteredimage/:URL
    // Implemented as a learning exercise
  // app.get( "/filteredimage/:URL", async ( req, res) => {
  //   let { URL } = req.params;
    
  //   if ( !URL ) {
  //     return res.status(400)
  //               .send(`URL is required`);
  //   }

  //   return res.status(200)
  //               .send(filterImageFromURL(URL));
  // } );

 

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();