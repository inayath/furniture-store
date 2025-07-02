import Link from 'next/link';
import { Button, Box } from '@mui/material';

export default function StoreButton() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Button variant="outlined" component={Link} href="/add-furniture">
        Add Furniture
      </Button>
    </Box>
  );
}
