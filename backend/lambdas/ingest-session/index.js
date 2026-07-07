const fs = require("fs");
const path = require("path");

function loadSampleEvent() {
  const filePath = path.join(
    __dirname,
    "../../../samples/session-event-example.json"
  );

  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

function validateStudySessionEvent(event) {
  const errors = [];

  if (!event.event_type) {
    errors.push("Missing field: event_type");
  }

  if (event.event_type !== "study_session.completed") {
    errors.push("Invalid event_type. Expected: study_session.completed");
  }

  if (!event.schema_version) {
    errors.push("Missing field: schema_version");
  }

  if (!event.user_id) {
    errors.push("Missing field: user_id");
  }

  if (!event.session) {
    errors.push("Missing field: session");
  }

  if (!event.session?.id) {
    errors.push("Missing field: session.id");
  }

  if (!event.session?.hsk_level) {
    errors.push("Missing field: session.hsk_level");
  }

  if (!event.session?.score) {
    errors.push("Missing field: session.score");
  }

  if (!Array.isArray(event.errors)) {
    errors.push("Field errors must be an array");
  }

  if (!event.generated_material) {
    errors.push("Missing field: generated_material");
  }

  if (!event.gamification) {
    errors.push("Missing field: gamification");
  }

  return errors;
}

function summarizeStudySession(event) {
  const flashcards = event.generated_material?.flashcards || [];
  const exercises = event.generated_material?.exercises || [];
  const miniTests = event.generated_material?.mini_test || [];
  const studyErrors = event.errors || [];

  return {
    sessionId: event.session.id,
    userId: event.user_id,
    hskLevel: event.session.hsk_level,
    scorePercentage: event.session.score.percentage,
    totalErrors: studyErrors.length,
    totalFlashcards: flashcards.length,
    totalExercises: exercises.length,
    totalMiniTests: miniTests.length,
    penaltyAmountEur: event.gamification?.penalty_amount_eur || 0
  };
}

function main() {
  try {
    const event = loadSampleEvent();

    const validationErrors = validateStudySessionEvent(event);

    if (validationErrors.length > 0) {
      console.error("Invalid study session event:");
      validationErrors.forEach((error) => console.error(`- ${error}`));
      process.exit(1);
    }

    const summary = summarizeStudySession(event);

    console.log("Study session received successfully");
    console.log("-----------------------------------");
    console.log(`Session ID: ${summary.sessionId}`);
    console.log(`User ID: ${summary.userId}`);
    console.log(`HSK Level: ${summary.hskLevel}`);
    console.log(`Score: ${summary.scorePercentage}%`);
    console.log(`Errors: ${summary.totalErrors}`);
    console.log(`Flashcards: ${summary.totalFlashcards}`);
    console.log(`Exercises: ${summary.totalExercises}`);
    console.log(`Mini tests: ${summary.totalMiniTests}`);
    console.log(`Simulated penalty: ${summary.penaltyAmountEur} EUR`);
  } catch (error) {
    console.error("Unexpected error while processing study session:");
    console.error(error.message);
    process.exit(1);
  }
}

main();