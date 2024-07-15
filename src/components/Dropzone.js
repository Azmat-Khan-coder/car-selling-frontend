import { Container, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { MAX_IMAGE_COUNT, MAX_IMAGE_SIZE } from "@/constants/dropzoneConstant";

function Dropzone({ onDrop, maxPictures }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: maxPictures || MAX_IMAGE_COUNT,
    maxSize: MAX_IMAGE_SIZE,
    multiple: true,
    onDrop,
  });
  return (
    <Container
      maxWidth="sm"
      {...getRootProps()}
      style={{
        textAlign: "center",
        padding: "20px",
        margin: "10px 0px 20px 0px",
        border: "3px blue dashed",
      }}
    >
      <input className="input-zone" {...getInputProps()} />
      {isDragActive ? (
        <Typography> Drop the files here ...</Typography>
      ) : (
        <Typography>
          Drag & drop some files here, or click to select files
        </Typography>
      )}
    </Container>
  );
}

export default Dropzone;
