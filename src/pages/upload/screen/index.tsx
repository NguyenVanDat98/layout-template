import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps, UploadFile } from "antd";
import { Button, Form, message, Upload } from "antd";

const { Dragger } = Upload;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export default function UploadPage(): React.JSX.Element {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setFileList((old) =>
      old.map((oldItem) => {
        oldItem.status = "uploading";
        return oldItem;
      })
    );
    Promise.allSettled(
      fileList.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file as FileType);
        try {
          const data = await fetch("http://localhost:8555/api/v1/file-morei", {
            method: "POST",
            body: formData,
          });
          return await data.json();
        } catch (error) {
          console.log(error);
          throw new Error();
        }
      })
    )
      .then((value) => {
        const cloneFileList = [...fileList];
        value.map((val, index) => {
          if (val.status !== "fulfilled") {
            cloneFileList[index].status = "error";
            console.log(val.reason);
          } else {
            cloneFileList[index].status = "done";
            cloneFileList[index].response = val.value;
          }
        });
        setFileList(cloneFileList);
      })
      .catch(() => {})

      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file, fileList_) => {
        setTimeout(() => {
            setFileList((e)=>{
                return e.map((value)=>{
                        if(value.status=='uploading'){
                            value.status='done';
                        }

                        return value
                })
            })
        }, 2000);
      setFileList([...fileList, ...fileList_.map(file=>{
        file.status = 'uploading'
        return file
      })]);

      return false;
    },
    fileList,
  };
  return (
    <Form>
      <Form.Item valuePropName="fileList" getValueFromEvent={() => {}}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </Form>
  );
}
