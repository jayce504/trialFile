import { Component } from "react";
import AWS from 'aws-sdk';


class AddPhoto extends Component {

 AddPhoto = (albumName) => {
        var albumBucketName = 'tf-client-pictures';

        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: albumBucketName}
        });

        var files = document.getElementById('photoupload').files;
        if (!files.length) {
        return alert('Please choose a file to upload first.');
        }
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + '//';
    
        var photoKey = albumPhotosKey + fileName;
        s3.upload({
        Key: photoKey,
        Body: file,
        ACL: 'public-read'
        }, function(err, data) {
        if (err) {
            return alert('There was an error uploading your photo: ', err.message);
        } else {
        alert('Successfully uploaded photo.');
        //   viewAlbum(albumName);
        }
    });
    }
}

export default AddPhoto;