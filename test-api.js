async function test() {
  try {
    // 1. Test Piston Sandbox Execution
    console.log("=== Testing Execution API (Piston Sandbox) ===");
    const resRun = await fetch("http://localhost:3000/api/execute/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "python",
        sourceCode: "def greet(name):\n    print(f'Hello {name}, executing natively from KalpKrafts Sandbox!')\ngreet('Developer')"
      })
    });
    
    const runData = await resRun.json();
    console.log(runData);

    // 2. Test Multi-modal AI Chat
    console.log("\n=== Testing AI Coach ===");
    const resAi = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Why does my array go out of bounds?",
        mode: "debug",
        language: "java"
      })
    });
    
    const aiData = await resAi.json();
    console.log(aiData);
  } catch (error) {
    console.error("Test framework error", error);
  }
}
test();
