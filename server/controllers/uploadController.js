const cloudinary = require('../config/cloudinary');
const multer     = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Extract public_id from a Cloudinary URL
function getPublicId(url) {
  if (!url || !url.includes('cloudinary.com')) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match ? match[1] : null;
}

// Delete a single Cloudinary asset by URL
async function deleteByUrl(url) {
  const publicId = getPublicId(url);
  if (!publicId) return;
  try { await cloudinary.v2.uploader.destroy(publicId); } catch (_) {}
}

module.exports.deleteByUrl = deleteByUrl;

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'luxestate',
        resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
        transformation: file.mimetype !== 'application/pdf'
          ? [{ width: 1600, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
          : undefined,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
}

// POST /api/upload
exports.uploadFile = [
  upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
      const result = await uploadToCloudinary(req.file);
      res.json({ success: true, url: result.secure_url, publicId: result.public_id });
    } catch (err) { next(err); }
  },
];

// POST /api/upload/multiple
exports.uploadMultiple = [
  upload.array('files', 20),
  async (req, res, next) => {
    try {
      if (!req.files?.length) return res.status(400).json({ success: false, message: 'No files uploaded' });
      const uploads = await Promise.all(req.files.map((file) => uploadToCloudinary(file)));
      const urls = uploads.map((item) => ({ url: item.secure_url, publicId: item.public_id }));
      res.json({ success: true, urls });
    } catch (err) { next(err); }
  },
];

// DELETE /api/upload/:publicId
exports.deleteFile = async (req, res, next) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    await cloudinary.v2.uploader.destroy(publicId);
    res.json({ success: true, message: 'File deleted' });
  } catch (err) { next(err); }
};
