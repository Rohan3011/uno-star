import express, { Request, Response } from "express";

const router = express.Router();

export type RoomParams = {
  id: string;
};

router.get("/:id", (req: Request<RoomParams>, res: Response) => {
  const roomId = req.params.id;
});
