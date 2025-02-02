import { questions } from "../data";
import { Reward } from "./rewards.page";

export const userRewardsList: Reward[] = [
    {
        description: `'Emotion Master: Answered correctly all ${questions.length} emotions in the game.'`,
        image: 'assets/quiz/emotion_master.png',
        score: questions.length // All questions are correct
    },
    {
        description: 'Emotional Detective: Correctly identified 25 emotions in a row.',
        image: 'assets/quiz/emotional_detective.png',
        score: 25
    }
]