import DataLoader from "dataloader";
import { Project } from "@prisma/client";
import { db } from "../utils/db";

export const clientLoader = new DataLoader<string, Project>(
  async (ids: string[]) => {
    const clients = await db.client.findMany({ where: { id: { in: ids } } });

    const map = {};
    for (let i = 0; i < clients.length; i++) {
      const client = clients[i];
      map[client.id] = client;
    }

    return ids.map((id) => map[id]);
  }
);

export const projectLoader = new DataLoader<string, Project>(
  async (ids: string[]) => {
    const projects = await db.project.findMany({
      where: { clientId: { in: ids } },
    });

    const map: Record<string, Project> = {};
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      map[project.clientId] = project;
    }

    return ids.map((id) => map[id]);
  }
);
