const offline: boolean = false;

export const baseAddress = offline
  ? "https://localhost:7285"
  : "https://peter-quiz-app.azurewebsites.net";
