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
  const validationErrors = [];

  if (!event.event_type) {
    validationErrors.push("Missing field: event_type");
  }

  if (event.event_type !== "study_session.completed") {
    validationErrors.push(
      "Invalid event_type. Expected: study_session.completed"
    );
  }

  if (!event.schema_version) {
    validationErrors.push("Missing field: schema_version");
  }

  if (!event.user_id) {
    validationErrors.push("Missing field: user_id");
  }

  if (!event.session) {
    validationErrors.push("Missing field: session");
  }

  if (!event.session?.id) {
    validationErrors.push("Missing field: session.id");
  }

  if (!event.session?.hsk_level) {
    validationErrors.push("Missing field: session.hsk_level");
  }

  if (!event.session?.score) {
    validationErrors.push("Missing field: session.score");
  }

  if (typeof event.session?.score?.percentage !== "number") {
    validationErrors.push(
      "Missing or invalid field: session.score.percentage"
    );
  }

  if (!Array.isArray(event.errors)) {
    validationErrors.push("Field errors must be an array");
  }

  if (Array.isArray(event.errors)) {
    event.errors.forEach((studyError, index) => {
      if (!studyError.concept_id) {
        validationErrors.push(`Missing field: errors[${index}].concept_id`);
      }

      if (!studyError.concept_label) {
        validationErrors.push(`Missing field: errors[${index}].concept_label`);
      }

      if (!studyError.category) {
        validationErrors.push(`Missing field: errors[${index}].category`);
      }

      if (!studyError.concept_type) {
        validationErrors.push(`Missing field: errors[${index}].concept_type`);
      }

      if (!studyError.hsk_level) {
        validationErrors.push(`Missing field: errors[${index}].hsk_level`);
      }

      if (!studyError.severity) {
        validationErrors.push(`Missing field: errors[${index}].severity`);
      }

      if (
        studyError.severity &&
        !["low", "medium", "high", "critical"].includes(studyError.severity)
      ) {
        validationErrors.push(
          `Invalid severity in errors[${index}]. Expected: low, medium, high or critical`
        );
      }

      if (!studyError.explanation) {
        validationErrors.push(`Missing field: errors[${index}].explanation`);
      }
    });
  }

  if (!event.generated_material) {
    validationErrors.push("Missing field: generated_material");
  }

  if (!Array.isArray(event.generated_material?.flashcards)) {
    validationErrors.push(
      "Field generated_material.flashcards must be an array"
    );
  }

  if (!Array.isArray(event.generated_material?.exercises)) {
    validationErrors.push(
      "Field generated_material.exercises must be an array"
    );
  }

  if (!Array.isArray(event.generated_material?.mini_tests)) {
    validationErrors.push(
      "Field generated_material.mini_tests must be an array"
    );
  }

  return validationErrors;
}

function countErrorsBySeverity(studyErrors) {
  const result = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  };

  studyErrors.forEach((studyError) => {
    if (result[studyError.severity] !== undefined) {
      result[studyError.severity] += 1;
    }
  });

  return result;
}

function summarizeStudySession(event) {
  const studyErrors = event.errors || [];
  const flashcards = event.generated_material?.flashcards || [];
  const exercises = event.generated_material?.exercises || [];
  const miniTests = event.generated_material?.mini_tests || [];

  return {
    sessionId: event.session.id,
    userId: event.user_id,
    hskLevel: event.session.hsk_level,
    scorePercentage: event.session.score.percentage,
    totalErrors: studyErrors.length,
    errorsBySeverity: countErrorsBySeverity(studyErrors),
    totalFlashcards: flashcards.length,
    totalExercises: exercises.length,
    totalMiniTests: miniTests.length
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
    console.log(`- Low severity: ${summary.errorsBySeverity.low}`);
    console.log(`- Medium severity: ${summary.errorsBySeverity.medium}`);
    console.log(`- High severity: ${summary.errorsBySeverity.high}`);
    console.log(`- Critical severity: ${summary.errorsBySeverity.critical}`);
    console.log(`Flashcards: ${summary.totalFlashcards}`);
    console.log(`Exercises: ${summary.totalExercises}`);
    console.log(`Mini tests: ${summary.totalMiniTests}`);
    console.log("-----------------------------------");
    console.log("Penalty amount is not imported from ChatGPT.");
    console.log("It will be calculated later by ZhongwenLock using user settings.");
  } catch (error) {
    console.error("Unexpected error while processing study session:");
    console.error(error.message);
    process.exit(1);
  }
}

main();