"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/general/PageTitle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import { uploadFile } from "@/utils/uploadFunction";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const EditBook = () => {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  const { loading, getDoc, updateDoc } = useContext(GlobalContext);
  const { toast } = useToast();
  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    let mounted = true;

    const fetchDoc = async () => {
      const res = await getDoc(id);

      if (mounted) {
        setData(res);
      }
    };

    fetchDoc();

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!!data) {
      setTitle(data.title);
      setAuthor(data.author);
      setDescription(data.description);
      setThumbnailSrc(data.thumbnail);
      setUrl(data.url);
      setThumbnailUrl(data.thumbnail);
      setFileName(data?.filename);
    }
  }, [data]);

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
      if (!!url) {
        toast({
          description: "Document updated successfully!",
        });
      }
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
      if (!!url) {
        toast({
          description: "Thumbnail updated successfully!",
        });
      }
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

    const res = await updateDoc(
      title,
      description,
      url,
      thumbnailUrl,
      author,
      id,
      fileName
    );

    if (!!res) {
      toast({
        title: "Book Updated!",
        description: "Your book details has been updated successfully.",
      });
      router.push("/library");
    }
  };

  useEffect(() => {
    document.title = `Edit ${data?.title} | ${siteTitle}`;
  }, [data]);

  return (
    <div className="max-w-[1200px] mx-auto p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 max-w-[900px] mx-auto">
        <PageTitle title={"Edit your book"} />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Author's name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
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
                <div className="w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-colors border-gray-300 cursor-pointer">
                  {!file ? (
                    <div className="text-center text-gray-500">
                      <p className="text-md">
                        {!!fileName ? fileName : "Drop or upload a PDF here"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <p>{file.name}</p>
                    </div>
                  )}
                </div>
              </FileUploader>
              <Button disabled={uploading || !file} onClick={uploadDocFile}>
                {uploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Document"
                )}
              </Button>
            </div>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col gap-4">
              <FileUploader
                handleChange={handleImageChange}
                value={file}
                types={["png", "jpeg", "jpg"]}
                maxSize={5}
                onSizeError={(file) => {
                  toast({
                    variant: "destructive",
                    title: "File size exceeded!",
                    description:
                      "Please upload an image of size less than 5 Mb",
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
                <div className="w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-colors border-gray-300 cursor-pointer">
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
                      {/* <p>{image.name}</p> */}
                    </div>
                  )}
                </div>
              </FileUploader>
              <Button
                disabled={
                  thumbnailUploading ||
                  !thumbnailSrc ||
                  thumbnailSrc === data.thumbnail
                }
                onClick={uploadImageFile}
              >
                {thumbnailUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update thumbnail"
                )}
              </Button>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button type="submit" className="py-6 px-20 text-lg">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditBook;
