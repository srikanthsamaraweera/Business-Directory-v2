

export default async function resizeImages(file) {
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                600, // max width
                600, // max height
                "JPEG", // format
                70, // quality
                0, // rotation
                (uri) => {
                    resolve(uri);
                },
                "blob" // output type
            );
        });
    return resizeFile;
}