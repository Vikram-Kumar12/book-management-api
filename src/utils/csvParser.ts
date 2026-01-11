export const parseCSV = (content: string) => {
  const lines = content.split("\n");
  const errors: any[] = [];
  const validBooks: any[] = [];

  lines.slice(1).forEach((line, index) => {
    const [title, author, year] = line.split(",").map(field => field.trim());

    if (!title || !author || !year) {
      errors.push({ row: index + 2, message: "Missing fields" });
      return;
    }

    const publishedYear = Number(year);

    if (isNaN(publishedYear)) {
      errors.push({ row: index + 2, message: "Invalid year" });
      return;
    }

    validBooks.push({
      title: title.trim(),
      author: author.trim(),
      publishedYear,
    });
  });

  return { validBooks, errors };
};
