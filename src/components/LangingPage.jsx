import { Container, Typography, Button } from "@mui/material";

const LandingPage = () => {
  return (
    <Container component="main" maxWidth="md" style={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to LeetConnect
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Connect with fellow LeetCode enthusiasts.
      </Typography>
      <Button variant="contained" href="/signup" style={{ margin: "20px" }}>Get Started</Button>
    </Container>
  );
};

export default LandingPage;
