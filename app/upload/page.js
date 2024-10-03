"use client";
import { pinata } from "@/utils/config";
import { useState } from "react";

const Upload = () => {
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="md:text-4xl">Upload Doc</h1>

        <input type="file" onChange={handleChange} />
        <button disabled={uploading} onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </main>
    </div>
  );
};

export default Upload;
