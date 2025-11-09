export const fetchTechSkillsContents = async (): Promise<TechSkill[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/skills/tech`,
      {
        next: { revalidate: 10 },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch skills contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills contents:", error);
    throw error;
  }
};

export const fetchSkillsContents = async (): Promise<SkillContent[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/skills`, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch skills contents: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills contents:", error);
    throw error;
  }
};
