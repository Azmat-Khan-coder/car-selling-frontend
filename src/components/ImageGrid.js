import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageGrid({ images }) {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((item, index) => (
        <ImageListItem key={index}>
          <img src={item} alt="" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
