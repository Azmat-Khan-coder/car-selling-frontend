import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import axios from "@/services/axios.js";
import Dropzone from "./Dropzone.js";
import ImageGride from "./ImageGrid.js";

export default function SubmitCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const maxPictures = watch("maxPictures");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [...prevState, e.target.result]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  console.log({ maxPictures, images });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const body = { ...data, images };
      const response = await axios.post("/cars", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setSuccess("Car submitted successfully!");
        reset();
        setImages([]);
      }
    } catch (err) {
      alert("Failed to submit car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Submit Car</Typography>
        {success && <Typography color="primary">{success}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Car Model"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("model", {
              required: "Car Model is required",
              minLength: {
                value: 3,
                message: "Model must be at least 3 characters long",
              },
            })}
            error={!!errors.model}
            helperText={errors.model ? errors.model.message : ""}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be a positive number" },
            })}
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ""}
          />
          <TextField
            label="Phone"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 11,
                message: "Phone number must be exactly 11 characters long",
              },
              maxLength: {
                value: 11,
                message: "Phone number must be exactly 11 characters long",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />
          <FormControl
            variant="outlined"
            error={!!errors.city}
            margin="normal"
            fullWidth
          >
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              {...register("city", {
                required: "City is required",
              })}
              label="City"
              defaultValue="Lahore"
            >
              <MenuItem value="Lahore">Lahore</MenuItem>
              <MenuItem value="Karachi">Karachi</MenuItem>
            </Select>
            {errors.city && (
              <FormHelperText>{errors.city.message}</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Max Number of Pictures"
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("maxPictures", {
              required: "Max number of pictures is required",
              min: { value: 1, message: "Minimum is 1" },
              max: { value: 10, message: "Maximum is 10" },
            })}
            error={!!errors.maxPictures}
            helperText={errors.maxPictures ? errors.maxPictures.message : ""}
          />
          <Dropzone onDrop={onDrop} maxPictures={maxPictures} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
        <ImageGride images={images} />
      </Box>
    </Container>
  );
}
