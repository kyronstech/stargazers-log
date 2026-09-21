document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("starred-list");

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const events = await response.json();

    if (!events.length) {
      list.innerHTML = "<li class='empty'>No starred repositories available yet.</li>";
      return;
    }

    list.innerHTML = events
      .map((event) => {
        const updatedDate = event.pushed_at
          ? new Date(event.pushed_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recently";

        return `
          <li class="repo-item">
            <div class="repo-header">
              <h2>${event.name}</h2>
              <span class="stars">★ ${event.stargazers_count}</span>
            </div>
            <p class="description">${event.description || "No description provided."}</p>
            <div class="meta">
              <span class="language">${event.language || "Other"}</span>
              <span>Updated ${updatedDate}</span>
            </div>
          </li>
        `;
      })
      .join("");
  } catch (error) {
    list.innerHTML = "<li class='error'>Unable to load starred repositories.</li>";
    console.error("Failed to load events.json:", error);
  }
});
