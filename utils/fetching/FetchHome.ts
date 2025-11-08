const API_URL = `${process.env.NEXT_PUBLIC_URL}/api/home`;

export const fetchHomeContents = async (): Promise<HomeContent[]> => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch home contents: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching home contents:", error);
    throw error;
  }
};
