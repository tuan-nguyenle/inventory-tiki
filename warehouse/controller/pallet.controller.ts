import "express-async-errors";
import { Request, Response } from "express";
import * as PalletServices from "../services/pallet.services";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@microservies-inventory/common";

export const searchPallet = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const pallets = await PalletServices.searchPallet(req.query);
    return res.status(200).send({ pallets });
}

export const insertPallet = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    await PalletServices.insertPallet(req.body);

    return res
        .status(201)
        .send({ msg: "Insert new Pallet success" });
};
