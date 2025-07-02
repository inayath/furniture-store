// pages/add-furniture.js

import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,Stack, Link
} from "@mui/material";

export default function AddFurniture() {
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { name, price, stock } = formData;

    if (!name || !price || !stock) {
      return setError("All fields are required");
    }

    try {
      const res = await fetch("/api/furniture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          stock: parseInt(stock),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", price: "", stock: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add furniture");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Furniture
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          margin="normal"
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Add Furniture
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            href="/"
          >
            Cancel
          </Button>
        </Stack>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Furniture added successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}
