// dependencies
const util = require("util");
const sharp = require("sharp");
var AWS = require("aws-sdk");
require("dotenv").config();
const {
    MY_AWS_ACCESS_KEY_ID,
    MY_AWS_SECRET_ACCESS_KEY,
    MY_AWS_REGION,
} = process.env;

// get reference to S3 client
const s3 = new AWS.S3({
    accessKeyId: MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: MY_AWS_SECRET_ACCESS_KEY,
});

const bucket = "nashchart";

exports.handler = async (event, context, callback) => {
    console.log(event, context);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ hello: "world" }),
    });
    // try {
    //     const result = await s3
    //       .upload({
    //         // The bucket name
    //         Bucket: "nashchart",
    //         // The key/name of your file
    //         Key: `test.png`,
    //         // The contents of your file
    //         Body: JSON.stringify({ hello: "world" }),
    //         // The access control
    //         ACL: "private",
    //         ContentEncoding: "utf8", // required
    //         ContentType: `application/json`,
    //       })
    //       .promise()

    //     if (error) return { statusCode: 500, body: JSON.stringify(error) }

    //     return { statusCode: 200, body: JSON.stringify(result) }
    //   } catch (e) {
    //     return { statusCode: 500, body: e.message }
    //   }
};
// exports.handler = async (event, context, callback) => {
//     // Read options from the event parameter.
//     console.log(
//         "Reading options from event:\n",
//         util.inspect(event, { depth: 5 })
//     );
//     const srcBucket = event.Records[0].s3.bucket.name;
//     // Object key may have spaces or unicode non-ASCII characters.
//     const srcKey = decodeURIComponent(
//         event.Records[0].s3.object.key.replace(/\+/g, " ")
//     );
//     const dstBucket = srcBucket + "-resized";
//     const dstKey = "resized-" + srcKey;

//     // Infer the image type from the file suffix.
//     const typeMatch = srcKey.match(/\.([^.]*)$/);
//     if (!typeMatch) {
//         console.log("Could not determine the image type.");
//         return;
//     }

//     // Check that the image type is supported
//     const imageType = typeMatch[1].toLowerCase();
//     if (imageType != "jpg" && imageType != "png") {
//         console.log(`Unsupported image type: ${imageType}`);
//         return;
//     }

//     // Download the image from the S3 source bucket.

//     try {
//         const params = {
//             Bucket: srcBucket,
//             Key: srcKey,
//         };
//         var origimage = await s3.getObject(params).promise();
//     } catch (error) {
//         console.log(error);
//         return;
//     }

//     // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
//     const width = 200;

//     // Use the Sharp module to resize the image and save in a buffer.
//     try {
//         var buffer = await sharp(origimage.Body).resize(width).toBuffer();
//     } catch (error) {
//         console.log(error);
//         return;
//     }

//     // Upload the thumbnail image to the destination bucket
//     try {
//         const destparams = {
//             Bucket: dstBucket,
//             Key: dstKey,
//             Body: buffer,
//             ContentType: "image",
//         };

//         const putResult = await s3.putObject(destparams).promise();
//     } catch (error) {
//         console.log(error);
//         return;
//     }

//     console.log(
//         "Successfully resized " +
//             srcBucket +
//             "/" +
//             srcKey +
//             " and uploaded to " +
//             dstBucket +
//             "/" +
//             dstKey
//     );
// };
