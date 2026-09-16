"use server";

import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { SupplierUserCreateSchema } from "./schema/upsertSupplierUserShema";
import { RoleType } from "@/src/generated/prisma/enums";
import { ApiResponse, PromiseReturn } from "@/src/shared/utils";
import { RECORD_STATUS_ID } from "@/src/shared/domains/recordStatus";
import { VERIFICATION_STATUS_ID } from "@/src/shared/domains/verificationStatus";

type Data = {
    supplierId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    primaryRole: RoleType,
    secondaryRoleIds:number[]
}

interface Auth {
    password: string,
}

export const addSupplierUser = async (data: Data, auth: Auth) => {
    return PromiseReturn(async () => {


        const parse = SupplierUserCreateSchema.parse(data);
        const res = await prisma.supplierUser.create({
            data: {
                supplierId: parse.supplierId,
                recordStatusId: RECORD_STATUS_ID.INACTIVE,
                firstName: parse.firstName,
                lastName: parse.lastName,
                email: parse.email,
                phone: parse.phone,
                operationalStatus: "NORMAL",
                authentication: {
                    create: {
                        recordStatusId: RECORD_STATUS_ID.INACTIVE,//TODO:
                        verificationStatusId: VERIFICATION_STATUS_ID.IN_REVIEW,//TODO:
                        email: parse.email,
                        phone:parse.phone,
                        passwordHash: bcrypt.hashSync("123456", 10),// passwordHash: auth.password,
                        authMethod: "EMAIL",
                        primaryRole: parse.primaryRole,
                        createdBy: "system",
                        userRoles:{createMany:{data:parse.secondaryRoleIds.map(id=>({roleId:id}))}}
                    }
                }
            }
        });
        return ApiResponse.success("Usuario añadido exitosamente.", res);
    })
}