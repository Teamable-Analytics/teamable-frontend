export const formatDate = (dateString: string) =>
  dateString.split("T")[0].replace(/-/g, "/")
