"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GlobalContext } from "@/services/GlobalContext";
import { uploadFile } from "@/utils/uploadFunction";
import Image from "next/image";
import { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  const { uploadDoc } = useContext(GlobalContext);
  const { toast } = useToast();

  const uploadDocFile = async () => {
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const res = await uploadFile(file);
      const url = await res.json();
      setUrl(url);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  const uploadImageFile = async () => {
    if (!image) {
      return;
    }

    try {
      setThumbnailUploading(true);
      const res = await uploadFile(image);
      const url = await res.json();
      setThumbnailUrl(url);
      setThumbnailUploading(false);
    } catch (e) {
      console.log(e);
      setThumbnailUploading(false);
    }
  };

  const handleChange = (e) => {
    setFile(e);
  };

  const handleImageChange = (e) => {
    const url = URL.createObjectURL(e);
    setThumbnailSrc(url);
    setImage(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await uploadDoc(title, description, url, thumbnailUrl);
    console.log(res);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="md:text-4xl">Upload Doc</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FileUploader
              handleChange={handleChange}
              value={file}
              types={["pdf"]}
              maxSize={40}
              onSizeError={(file) => {
                toast({
                  variant: "destructive",
                  title: "File size exceeded!",
                  description:
                    "Please upload a document of size less than 40 Mb",
                });
              }}
              onTypeError={(err) => {
                toast({
                  variant: "destructive",
                  title: "Invalid video type",
                  description: err,
                });
              }}
            >
              <div className="w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-colors border-gray-300">
                {!file ? (
                  <div className="text-center text-gray-500">
                    <p className="text-md">Drop or upload a PDF here</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <p>{file.name}</p>
                  </div>
                )}
              </div>
            </FileUploader>
            <Button disabled={uploading} onClick={uploadDocFile}>
              {uploading ? "Uploading document..." : "Upload Document"}
            </Button>
            <FileUploader
              handleChange={handleImageChange}
              value={file}
              types={["png", "jpeg", "jpg"]}
              maxSize={5}
              onSizeError={(file) => {
                toast({
                  variant: "destructive",
                  title: "File size exceeded!",
                  description: "Please upload an image of size less than 5 Mb",
                });
              }}
              onTypeError={(err) => {
                toast({
                  variant: "destructive",
                  title: "Invalid image type",
                  description: err,
                });
              }}
            >
              <div className="w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-colors border-gray-300">
                {!thumbnailSrc ? (
                  <div className="text-center text-gray-500">
                    <p className="text-md">Drop or upload an image here</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      alt="image"
                      src={thumbnailSrc}
                      width={200}
                      height={400}
                    />
                    <p>{image.name}</p>
                  </div>
                )}
              </div>
            </FileUploader>
            <Button disabled={thumbnailUploading} onClick={uploadImageFile}>
              {thumbnailUploading
                ? "Uploading thumbnail..."
                : "Upload thumbnail"}
            </Button>
            <Button type="submit" disabled={title.trim().length === 0 || !file}>
              Submit
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Upload;
