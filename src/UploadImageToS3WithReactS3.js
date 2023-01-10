import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
window.Buffer = window.Buffer || require("buffer").Buffer; 

const S3_BUCKET ='fada-wine';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIAWNDW443R5KVARMMO';
const SECRET_ACCESS_KEY ='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';

const bucket = new S3Client(
    {
        credentials: {
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY,
        },
        region: REGION,
    }
);

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY, 
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;