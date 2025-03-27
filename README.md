

## File Upload Project
### Overview
This is a Node.js-based backend server that allows users to upload files (images and videos) to a server and subsequently to Cloudinary, a cloud-based media management platform. The project uses express-fileupload for handling file uploads, nodemailer to send confirmation emails to users after successful uploads, and includes additional features like image size reduction and local file storage. Environment variables are managed with dotenv, and the filesystem (fs) module is used to manage local file paths.

#### The server supports multiple upload types:

**Image Upload**: Upload images to Cloudinary.
**Video Upload**: Upload videos to Cloudinary.
**Image Size Reducer**: Reduce image file sizes before uploading.
**Local File Upload**: Store files locally on the server.
This project is ideal for applications requiring file management, such as media galleries, content management systems, or user-generated content platforms.

### Features
**File Upload**: Handles image and video uploads via express-fileupload.
**Cloudinary Integration**: Stores uploaded files in the cloud with proper configuration.
**Email Notifications**: Sends confirmation emails using nodemailer after successful uploads.
**Image Size Reduction**: Reduces image file sizes to optimize storage and bandwidth.
**Local Storage**: Saves files locally using the fs module with custom paths.
**Environment Management**: Uses dotenv to securely manage API keys and secrets.

### Prerequisites
Before setting up the project, ensure you have:

Node.js (v14.x or higher) and npm installed.
A Cloudinary account (for cloud storage).
A Gmail account or SMTP service (for nodemailer).
MongoDB (optional, if you extend this to store metadata).

### Dependencies
The project relies on the following npm packages:

**express:** Web framework for Node.js.
**express-fileupload:** Middleware for handling file uploads.
**cloudinary:** SDK for uploading files to Cloudinary.
**nodemailer:** Module for sending emails.
**dotenv:** Loads environment variables from a .env file.
**fs (built-in):** Node.js filesystem module for local file operations.
Install them with:

```
npm install express express-fileupload cloudinary nodemailer dotenv
```
### Project Structure
```
file-upload-project/
├── uploads/              # Local folder for temporary file storage
├── .env                 # Environment variables (not tracked in git)
├── server.js            # Main server file
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

### Setup Instructions
1. Clone the Repository
```
git clone https://github.com/yourusername/file-upload-project.git
cd file-upload-project
```

2. Install Dependencies
```
npm install
```

3. Configure Environment Variables
Create a .env file in the root directory and add the following:
```
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
UPLOAD_DIR=./uploads/
Cloudinary Credentials: Sign up at Cloudinary, then find your cloud_name, api_key, and api_secret in the dashboard under "Account Details".
Email Credentials: Use a Gmail account with an App Password (if 2FA is enabled) or another SMTP service.
```

4. Set Up Cloudinary
   
Install the Cloudinary SDK:
```
npm install cloudinary
```

### Usage
#### Upload an Image:
Send a POST request to http://localhost:3000/upload/image with a file in the file field (e.g., via Postman or a frontend form).
Response: { "url": "https://res.cloudinary.com/...", "msg": "Image uploaded successfully" }
Email: User receives a confirmation with the Cloudinary URL.
Upload a Video:
Send a POST request to http://localhost:3000/upload/video.
Similar response and email notification.
Local Storage: Files are temporarily stored in ./uploads/ before Cloudinary upload.
