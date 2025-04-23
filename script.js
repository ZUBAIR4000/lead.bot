// 1) Define your commands array:
const commands = [
    { name: "ban", desc: "Bans a user.", category: "Moderation", perms: "Ban Members", aliases: ["banish"], args: "user, reason" },
    { name: "kick", desc: "Kicks a user.", category: "Moderation", perms: "Kick Members", aliases: ["boot"], args: "user" },
    { name: "balance", desc: "Shows your balance.", category: "Economy", perms: "N/A", aliases: ["bal"], args: "" },
    { name: "daily", desc: "Collect daily reward.", category: "Economy", perms: "N/A", aliases: [], args: "" },
    // …add hundreds more here
  ];
  
  // 2) Auto-populate category filter:
  const categoryFilter = document.getElementById("categoryFilter");
  [..."All", ...new Set(commands.map(c=>c.category))].forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat; opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
  
  // 3) Render function:
  function render(filter="", search="") {
    const grid = document.getElementById("commandsGrid");
    grid.innerHTML = "";
    commands
      .filter(c => (filter==="All"||c.category===filter)
                   && c.name.includes(search.toLowerCase()))
      .forEach(c => {
        const card = document.createElement("div");
        card.className = "bg-gray-800 p-4 rounded-lg";
        card.innerHTML = `
          <div class="flex items-center mb-2">
            <svg class="w-6 h-6 mr-2"><use xlink:href="#icon-${c.name.split(" ")[0] || "command"}"/></svg>
            <h3 class="text-lg font-semibold">${c.name}</h3>
          </div>
          <p class="text-sm mb-2">${c.desc}</p>
          <p class="text-xs"><strong>Category:</strong> ${c.category}</p>
          <p class="text-xs"><strong>Perms:</strong> ${c.perms}</p>
          <p class="text-xs"><strong>Aliases:</strong> ${c.aliases.join(", ") || "N/A"}</p>
          <p class="text-xs"><strong>Args:</strong> ${c.args || "N/A"}</p>
        `;
        grid.appendChild(card);
      });
  }
  
  // 4) Wire up search + filter:
  document.getElementById("search").addEventListener("input", e => {
    render(categoryFilter.value, e.target.value);
  });
  categoryFilter.addEventListener("change", () => {
    render(categoryFilter.value, document.getElementById("search").value);
  });
  
  // 5) Initial render:
  render("All", "");
  