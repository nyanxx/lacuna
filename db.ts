import { createClient } from "@libsql/client";

export const db = createClient({
  url: "file:./lacuna-items.db",
});

async function createTable() {
  await db.execute(`
        create table if not exists items (
            id text primary key,
            title text not null,
            description text,
            content text, 
            created_at text default (datetime('now'))
        )
        `);

  console.log("Table created successfully");
}

const seedData = [
  {
    id: "1",
    title: "The Rise of TypeScript",
    description: "Why TypeScript has become a favorite among developers.",
    content:
      "TypeScript adds static typing to JavaScript, helping developers catch errors early and build more maintainable applications. Its integration with popular frameworks and strong tooling support have made it a standard in modern web development.",
  },
  {
    id: "2",
    title: "Healthy Morning Routine",
    description: "Simple habits to start your day with energy.",
    content:
      "Hydrate first thing in the morning, do light stretching, and eat a balanced breakfast rich in protein and fiber. A short meditation session can also help set a calm and focused tone for the day.",
  },
  {
    id: "3",
    title: "Exploring Space",
    description: "Humanity’s journey beyond Earth.",
    content:
      "From the Apollo missions to the International Space Station, space exploration has expanded our understanding of the cosmos. Current projects like Artemis and SpaceX’s Starship aim to establish a sustainable human presence on the Moon and Mars.",
  },
  {
    id: "4",
    title: "The Art of Coffee Brewing",
    description: "Discovering flavors through different brewing methods.",
    content:
      "Pour-over, French press, and espresso each highlight unique aspects of coffee. Grind size, water temperature, and brew time all play a role in shaping the taste, making coffee both a science and an art.",
  },
  {
    id: "5",
    title: "Climate Change Challenges",
    description: "Understanding the global impact of warming.",
    content:
      "Rising temperatures, melting ice caps, and extreme weather events emphasize the urgency of climate action. Renewable energy, sustainable agriculture, and international cooperation are vital to mitigating its effects.",
  },
];

async function seedTable() {
  try {
    for (const { id, content, description, title } of seedData) {
      await db.execute({
        sql: "INSERT INTO items (id, content, description, title) VALUES (?, ?, ?, ?)",
        args: [id, content, description, title],
      });
    }

    console.log("db seeded successfully");
  } catch (error) {
    console.error("Error inserting data:", (error as Error).message);
  }
}

// createTable();
// seedTable();
