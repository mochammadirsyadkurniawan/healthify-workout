import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import RightArrowIcon from "../../../../public/assets/icons/right-arrow.png";
import LeftArrowIcon from "../../../../public/assets/icons/left-arrow.png";

// const LeftArrow = () => {
//     const { scrollPrev } = useContext(VisibilityContext);

//     return (
//         <Box onClick={() => scrollPrev()} sx={{ cursor: "pointer", position: "absolute", bottom: 10, right: 70 }}>
//             <img src={LeftArrowIcon} alt="left-arrow" style={{ width: "30px" }} />
//         </Box>
//     );
// };

// const RightArrow = () => {
//     const { scrollNext } = useContext(VisibilityContext);

//     return (
//         <Box onClick={() => scrollNext()} sx={{ cursor: "pointer", position: "absolute", bottom: 10, right: 30 }}>
//             <img src={RightArrowIcon} alt="right-arrow" style={{ width: "30px" }} />
//         </Box>
//     );
// };

const HorizontalScrollbar = ({ data, isBodyParts, setBodyPart, bodyPart }) => {
    return (
        <Box className="scroll-container" sx={{ position: "relative", overflowX: "auto", whiteSpace: "nowrap", width: "100%" }}>
            <ScrollMenu >
                <Box sx={{ display: "flex" }}>
                    {data.map((item) => (
                        <Box
                            key={item.id || item}
                            itemID={item.id || item}
                            title={item.id || item}
                            sx={{
                                minWidth: "200px",
                                display: "flex",
                                textAlign: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "10px",
                                margin: "0 10px",
                            }}
                        >
                            {isBodyParts ? (
                                <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
                            ) : (
                                <ExerciseCard exercise={item} />
                            )}
                        </Box>
                    ))}
                </Box>
            </ScrollMenu>
        </Box>
    );
};

export default HorizontalScrollbar;
