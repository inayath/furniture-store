import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
 const dummyItems = [
  { id: 'dummy-1', name: 'Sagwan woord Chair', price: 49.99, stock: 10 },
  { id: 'dummy-2', name: 'Chais Tea table', price: 129.99, stock: 5 },
  { id: 'dummy-3', name: 'Indian sofa Set', price: 399.99, stock: 2 },
];

export default function FurnitureList() {
  const [items, setItems] = useState([]);


 useEffect(() => {
    fetch("/api/furniture")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          setItems(dummyItems); //   if no data
        }
      })
      .catch(() => {
        setItems(dummyItems); //   on fetch error
      });
  }, []);
  const handlePurchase = async (id) => {
    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ furniture_id: id, quantity: 1 }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Purchase successful: $${data.total_price}`);
      // Reload updated stock
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, stock: item.stock - 1 } : item
        )
      );
    } else {
      alert(data.error || "Purchase failed");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Furniture Store   
 
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(items) && items.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Typography>Stock: {item.stock}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handlePurchase(item.id)}
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
