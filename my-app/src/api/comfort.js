export async function getComfortMessage(mood) {
  const res = await fetch("http://localhost:5000/generate_comfort", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mood }),
  });

  const data = await res.json();
  return data.message;
}
