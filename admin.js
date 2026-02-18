const form = document.querySelector('#productForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerText = "Uploading image...";

    // 1. Upload Image to Cloudinary
    const file = document.getElementById('pImage').files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UNSIGNED_PRESET'); // Set this in Cloudinary

    const cloudRes = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData
    });
    const cloudData = await cloudRes.json();
    const imageUrl = cloudData.secure_url;

    // 2. Save Data to Firebase
    status.innerText = "Saving to Database...";
    await db.collection("products").add({
        name: document.getElementById('pName').value,
        price: document.getElementById('pPrice').value,
        image: imageUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    status.innerText = "Success! Product is live.";
    form.reset();
});
