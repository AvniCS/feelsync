// src/entities/User.jsx

export const User = {
  // Simulate fetching the current user
  me: async () => {
    return {
      onboarding_completed: true,  // Set false to redirect to Welcome page
      current_mood: "happy",
      mood_history: [
        { mood: "happy", timestamp: new Date().toISOString(), notes: "" },
      ],
      personalized_code: "ABC123",
      preferred_activities: ["reading", "exercise", "meditation"],
    };
  },

  // Simulate updating user data
  updateMyUserData: async (data) => {
    console.log("User data updated:", data);
    // Return updated data
    return data;
  },
};
