import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";

function Footer(props) {
  const links = ["View Posts", "Calendar Page", "View Map", "My Page"];

  return (
    <Box
      sx={{
        backgroundColor: "#303030",
        textAlign: "center",
        mt: "auto",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "inline-flex", color: "white", fontWeight: "100" }}>
          {links.map((link, i) => (
            <React.Fragment key={link}>
              <Link href="/" color="inherit" underline="hover" key={link}>
                {link}
              </Link>
              {i < links.length - 1 && (
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ bgcolor: "white", mx: "10px" }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <Typography
          color="white"
          variant="subtitle2"
          fontWeight={100}
          sx={{ mt: 3 }}
        >
          © Gather to U, {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
