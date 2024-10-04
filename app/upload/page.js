"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/services/GlobalContext";
import { pinata } from "@/utils/config";
import { useState, useContext } from "react";

const Upload = () => {
  const { uploadDoc } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const keyRequest = await fetch("/api/key");
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      const urlReuest = await fetch("/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: upload.cid }),
      });
      const url = await urlReuest.json();
      setUrl(url);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFile(e.target?.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await uploadDoc(title, description, url, imageUrl);
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
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={handleChange} />
          <button disabled={uploading} onClick={uploadFile}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <Button type="submit">Submit</Button>
        </form>
      </main>
    </div>
  );
};

export default Upload;
