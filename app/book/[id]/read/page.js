"use client";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";

const ReadBook = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const { getDoc } = useContext(GlobalContext);
  const { id } = useParams();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    let mounted = true;

    const fetchDoc = async () => {
      const res = await getDoc(id);

      if (mounted) {
        setUrl(res.url);
      }
    };

    fetchDoc();

    return () => {
      mounted = false;
    };
  }, [id]);

  const getFile = async () => {
    const res = await fetch("/api/fetch-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setFile(data.data);
    return;
  };

  useEffect(() => {
    getFile();
  }, [url]);

  useEffect(() => {
    document.title = `Reading... | ${siteTitle}`;
  }, []);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
      <div style={{ height: "100vh" }}>
        {!!file && (
          <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} />
        )}
      </div>
    </Worker>
  );
};

export default ReadBook;
