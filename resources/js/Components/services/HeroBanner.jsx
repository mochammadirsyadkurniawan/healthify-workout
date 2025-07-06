// import React from "react";
// import { Box, Stack, Typography } from "@mui/material";

// import HeroBannerImage from "../../../../public/assets/images/banner.png";

// const HeroBanner = () => (
//     <Box
//         sx={{ mt: { lg: "212px", xs: "70px" }, ml: { sm: "50px" } }}
//         position="relative"
//         p="20px"
//     >
//         <Typography color="#0D5EAD" fontWeight="600" fontSize="35px">
//             Healthify Workout
//         </Typography>
//         <Typography
//             fontWeight={700}
//             sx={{ fontSize: { lg: "44px", xs: "40px" } }}
//             mb="23px"
//             mt="30px"
//         >
//             Sweat, Smile <br />
//             And Repeat
//         </Typography>
//         <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
//             Check out the most effective exercises personalized to you
//         </Typography>
//         <Stack>
//             <a
//                 href="#exercises"
//                 style={{
//                     marginTop: "45px",
//                     textDecoration: "none",
//                     width: "200px",
//                     textAlign: "center",
//                     background: "#0D5EAD",
//                     padding: "14px",
//                     fontSize: "22px",
//                     textTransform: "none",
//                     color: "white",
//                     borderRadius: "4px",
//                 }}
//             >
//                 Explore Exercises
//             </a>
//         </Stack>
//         <Typography
//             fontWeight={600}
//             color="#0D5EAD"
//             sx={{
//                 opacity: "0.1",
//                 display: { lg: "block", xs: "none" },
//                 fontSize: "160px",
//                 marginBottom: "200px"
//             }}
//         >
//             Healthify
//         </Typography>
//         <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
//     </Box>
// );

// export default HeroBanner;


import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Typed from "typed.js";
import HeroBannerImage from "../../../../public/assets/images/banner.png";

const HeroBanner = () => {
    useEffect(() => {
        // Inisialisasi Typed.js
        const options = {
            strings: [
                "Get Fit, Stay Healthy",
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1000, // Delay sebelum mulai backspace
            loop: true,  // Looping
        };

        const typed = new Typed(".typing", options);

        return () => {
            typed.destroy();  // Bersihkan ketika komponen dibersihkan
        };
    }, []);

    return (
        <Box
            sx={{ mt: { lg: "120px", xs: "70px" }, ml: { sm: "50px" } }}
            position="relative"
            p="30px"
        >
            <Typography color="#0D5EAD" fontWeight="600" fontSize="50px">
                Healthify Workout
            </Typography>

            <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: "40px", xs: "40px" }

            }}
            >
                <span className="typing"></span>
            </Typography>

            <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
                Check out the most effective exercises personalized to you
            </Typography>
            <Stack sx={{
                marginBottom: "50px"
            }}>
                <a
                    href="#exercises"
                    className="explore-exercises-button"
                >
                    Explore Exercises
                </a>
            </Stack>

            <Typography
                fontWeight={600}
                color="#0D5EAD"
                sx={{
                    opacity: "0.1",
                    display: { lg: "block", xs: "none" },
                    fontSize: "150px",
                    marginBottom: "220px"
                }}
            >
                Healthify
            </Typography>
            <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
        </Box>
    );
};

export default HeroBanner;

