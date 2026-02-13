import { Box, Typography, Button, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: theme.palette.background.paper,
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        width: "100%",
        left: 0,
        right: 0,
        mb: 5,
      }}
    >
      <Box
        className="container"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: { xs: "64px", sm: "70px" },
          maxWidth: "lg",
          mx: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            color: theme.palette.common.black,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: { xs: "120px", sm: "200px", md: "none" },
          }}
        >
          Transações
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: { xs: "50%", sm: "24px" },
            textTransform: "none",
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, sm: 1 },
            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
            fontWeight: 500,
            boxShadow: "none",
            whiteSpace: "nowrap",
            minWidth: { xs: "40px", sm: "auto" },
            width: { xs: "40px", sm: "auto" },
            height: { xs: "40px", sm: "auto" },
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "none",
            },
            "& .MuiButton-startIcon": {
              margin: { xs: 0, sm: "0 8px 0 -4px" },
            },
          }}
        >
          <Typography
            component="span"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Nova Transação
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
