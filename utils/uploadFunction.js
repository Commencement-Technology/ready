import { pinata } from "./config";

export const uploadFile = async (file) => {
  const keyRequest = await fetch("/api/key");
  const keyData = await keyRequest.json();
  const upload = await pinata.upload.file(file).key(keyData.JWT);
  const urlRequest = await fetch("/api/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cid: upload.cid }),
  });
  console.log({ urlRequest });
  return urlRequest;
};
