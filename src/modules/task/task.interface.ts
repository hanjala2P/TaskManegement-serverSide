export interface ITask {
  title: string;
  description?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}