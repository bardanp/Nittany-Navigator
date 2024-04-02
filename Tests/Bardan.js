// Bardan.js
export const testSubmitEvent = async () => {
    console.log("Testing event submission with dummy data...");
    // Simulate a delay to mimic async behavior
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Event submitted successfully!");
        resolve(true); // Simulate successful async submission
      }, 1000);
    });
  };
  