import DataLoader from "dataloader";
import { Project } from "@prisma/client";

export interface MyContext {
  clientLoader: DataLoader<string, Project, string>;
  projectLoader: DataLoader<string, Project, string>;
}
