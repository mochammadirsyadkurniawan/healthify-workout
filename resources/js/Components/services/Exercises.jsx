import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "@/Utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 9;

    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(
        indexOfFirstExercise,
        indexOfLastExercise
    );

    //e and value come from materialUI API behind the scenes
    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1800, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchExercisesData = async () => {
            let exerciseData = [];
            if (bodyPart === "all") {
                exerciseData = await fetchData(
                    "https://exercisedb.p.rapidapi.com/exercises",
                    exerciseOptions
                );
            } else {
                exerciseData = await fetchData(
                    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
                    exerciseOptions
                );
            }
            setExercises(exerciseData);
        };
        fetchExercisesData();
    }, [bodyPart]);

    return (
        <Box id="exercises" sx={{ mt: { lg: "109px" } }} mt="50px" p="20px">
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ fontSize: { lg: "44px", xs: "30px" } }}
                mb="46px"
            >
                Showing Results
            </Typography>
            <Stack
                direction="row"
                sx={{ gap: { lg: "32px", xs: "50px" } }}
                flexWrap="wrap"
                justifyContent="center"
            >
                {currentExercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                ))}
            </Stack>
            <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
                {exercises.length > 9 && (
                    <Pagination
                        color="standard"
                        shape="rounded"
                        defaultPage={1}
                        count={Math.ceil(exercises.length / exercisesPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />
                )}
            </Stack>
        </Box>
    );
};

export default Exercises;
