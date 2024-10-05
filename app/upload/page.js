"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/services/GlobalContext";
import { uploadFile } from "@/utils/uploadFunction";
import { useContext, useState } from "react";

const Upload = () => {
  const { uploadDoc } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);

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
    setFile(e.target?.files?.[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target?.files?.[0]);
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
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            required
          />
          <button disabled={uploading} onClick={uploadDocFile}>
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
          <Input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
          <button disabled={thumbnailUploading} onClick={uploadImageFile}>
            {thumbnailUploading ? "Uploading thumbnail..." : "Upload thumbnail"}
          </button>
          <Button type="submit" disabled={title.trim().length === 0 || !file}>
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Upload;
